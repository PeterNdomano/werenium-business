import { connect } from '../Models/Database';
import { schema, Order } from 'lovefield';
//import React from 'react';


class Business{
  constructor(info, db){
    this.info = info;
    this.db = db;
  }

  saveSale = async (sale) => {
    let sales = this.db.getSchema().table('sales');
    let row = sales.createRow(sale);
    return (
      await this.db.insertOrReplace().into(sales).values([row]).exec().then((rows) => {
        return true;
      })
    )
  }

  editStock = async (item) => {
    let stock = this.db.getSchema().table('stock');
    return (
      await this.db.update(stock)
                    .set(stock.title, item.title)
                    .set(stock.quantity, item.quantity)
                    .set(stock.unit, item.unit)
                    .set(stock.bPrice, item.bPrice)
                    .set(stock.sPrice, item.sPrice)
                    .where(stock.id.eq(item.id))
                    .exec()
                    .then((res) => {
                      return true;
                    })
    );
  }

  deleteStock = async (id) => {
    let stock = this.db.getSchema().table('stock');
    return (
      await this.db.delete().from(stock).where(stock.id.eq(id)).exec().then(() => {
        return true;
      })
    );

  }

  getStock = async () => {
    let stock = this.db.getSchema().table('stock');
    return (
      await this.db.select().from(stock).orderBy(stock.id, Order.DESC).exec().then((rows) => {
        return rows;
      })
    )
  }

  saveStock = async (item) => {
    let stock = this.db.getSchema().table('stock');
    let row = stock.createRow(item);
    return (
      await this.db.insertOrReplace().into(stock).values([row]).exec().then((rows) => {
        return true;
      })
    )
  }

  static initialize = async (db) => {
    let business = null;
    let info = db.getSchema().table('businessInfo');
    await db.select()
      .from(info)
      .orderBy(info.id, Order.DESC)
      .exec()
      .then( async (rows) => {
        if(rows.length > 0){
          //set business details
          business = new Business(rows[0], db);
        }
        else{
          //insert row
          let row = info.createRow({
            'id': 1,
            'name': 'BFARMS',
            'currency': 'Tsh',
            'TIN': '8766-8765-989'
          });

          await db.insertOrReplace().into(info).values([row]).exec().then(
            (rows) => {
              business = new Business(rows[0], db);
            }
          );
        }
      });

    return business;
  }
}


export async function createBusiness(db){
  let business = await Business.initialize(db);
  return business;
}
