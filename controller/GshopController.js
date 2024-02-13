const express = require('express'); const server = express(); server.use(express.json());
const BinaryReader = require('../model/BinaryReader');
const iconv = require('iconv-lite');
const fs = require('fs').promises;
const { Iconv } = require('iconv');

let TimeStamp = null;
let Amount = null;
let List_categories = [];
let List_items = [];
let Max_place = 0;
let Version = 0;

async function ReadGshopData() {
    try {
        await fs.readFile('./TESTEDATA/gshop.data').then((data) => {
            const reader = new BinaryReader(data);
            TimeStamp = reader.readInt32();
            Amount = reader.readInt32();
            for (let index = 0; index < Amount; index++) {

                const it = new Item()
                it.Place = reader.readInt32();

                Max_place = index;
                it.Item_category = reader.readInt32();
                it.Item_sub_category = reader.readInt32();
                it.Icon = iconv.decode(reader.readBytes(128), 'cp936').split('\0')[0];;

                it.id = reader.readInt32();
                it.amount = reader.readInt32();

                for (let index = 0; index < 4; index++) {
                    const sl = new Sale();
                    sl.Price = reader.readInt32()
                    sl.Selling_end_time = reader.readInt32();
                    sl.During = reader.readInt32();

                    if (Version >= 1) {
                        sl.Selling_start_time = reader.readInt32();
                        sl.Control = reader.readInt32();
                        sl.Day = reader.readInt32();
                        sl.Status = reader.readInt32();
                        sl.Flags = reader.readInt32();
                    }
                    else {
                        if (index == 0) {
                            sl.Control = -1;
                        }
                        else {
                            sl.Control = 0;
                        }
                    }
                    it.Sales.push(sl);
                }
                if (Version >= 2) {
                    it.status = reader.readInt32();
                }

                it.Explanation = iconv.decode(reader.readBytes(1024), 'cp936').trimEnd('\0').replace(/\0/g, '');
                it.name = iconv.decode(reader.readBytes(64), 'cp936').trimEnd('\0').replace(/\0/g, '');

                if (Version >= 2) {
                    it.Gift_id = reader.readInt32();
                    it.Gift_amount = reader.readInt32();
                    it.Gift_time = reader.readInt32();
                }
                if (Version >= 3) {
                    it.ILogPrice = reader.readInt32();
                }

                it.OwnerNpcs;
                if (Version >= 4) {
                    for (let index = 0; index < 8; index++) {
                        it.OwnerNpcs.push(reader.readInt32());
                    }
                }
                if (Version >= 5) {
                    it.Period_limit = reader.readInt32();
                    it.Avail_frequency = reader.readInt32();
                }
                if (Version >= 6) {
                    it.Class = reader.readInt32();
                }

                // if (it.Item_category > 7 || it.Item_sub_category > 8 || it.Place < 0)
                // {
                //     throw new Exception();
                // }
                it.Place = index;
                List_items.push(it);
            }
            
            for (let index = 0; index < 8; index++) {
                const Ct = new Categories();
                //let name = iconv.decode(reader.readBytes(128), 'cp936');
                //let name =reader.readBytes(128);
                let name =reader.readStringUnicode(128);
                Ct.Category_name = name == null ? '' : name;
                console.log(name);
                Ct.Amount = reader.readInt32();

                for (let index = 0; index < Ct.Amount; index++) {
                    Ct.Sub_categories.push(iconv.decode(reader.readBytes(128), 'cp936'));
                }
                List_categories.push(Ct);
            }

            console.log("\x1b[33m[Read.data]\x1b[36m gshop OK \x1b[0m");
        }).catch((err) => {
            console.error("\x1b[33m[Read.data]\x1b[31mRead gshop.data Err( await fs.readFile):=>" + err + "\x1b[0m"); 
        })
    } catch (error) {
        console.error("\x1b[33m[Read.data]\x1b[31mRead gshop.data Err(Try):=>" + error + "\x1b[0m");
    }
}

class Item {
    constructor(
        Place,
        Item_category,
        Item_sub_category,
        Icon,
        Id,
        Amount,
        Sales = [],
        Status,
        Explanation,
        Name,
        Gift_id,
        Gift_amount,
        Gift_time,
        ILogPrice,
        OwnerNpcs,
        Period_limit,
        Avail_frequency,
        Class,
    ) {
        this.Place = Place;
        this.Item_category = Item_category;
        this.Item_sub_category = Item_sub_category;
        this.Icon = Icon;
        this.Id = Id;
        this.Amount = Amount;
        this.Sales = Sales;
        this.Status = Status;
        this.Explanation = Explanation;
        this.Name = Name;
        this.Gift_id = Gift_id;
        this.Gift_amount = Gift_amount;
        this.Gift_time = Gift_time;
        this.ILogPrice = ILogPrice;
        this.OwnerNpcs = OwnerNpcs;
        this.Period_limit = Period_limit;
        this.Avail_frequency = Avail_frequency;
        this.Class = Class;
    }


}
class Sale {
    constructor(
        Price,
        Selling_end_time,
        During,
        Selling_start_time,
        Control,
        Day,
        Status,
        Flags,
        Vip_lvl
    ) {
        this.Price = Price,
            this.Selling_end_time = Selling_end_time,
            this.During = During,
            this.Selling_start_time = Selling_start_time,
            this.Control = Control,
            this.Day = Day,
            this.Status = Status,
            this.Flags = Flags,
            this.Vip_lvl = Vip_lvl
    }
}

class Categories {
    constructor(
        Category_name,
        Amount,
        Sub_categories = []
    ) {
        this.Category_name = Category_name;
        this.Amount = Amount;
        this.Sub_categories = Sub_categories;
    }
}
ReadGshopData();

module.exports = {
    Gshop: async (req, res) => {
        return res.json({
            TimeStamp: TimeStamp,
            Amount: Amount,
            List_categories: List_categories,
            List_items: List_items,
            Max_place: Max_place,
            Version: Version
        })
    }
};
