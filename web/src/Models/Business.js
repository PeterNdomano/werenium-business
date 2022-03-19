import { connect } from '../Models/Database';
import { schema, Order } from 'lovefield';
//import React from 'react';


class Business{
  constructor(info, db){
    this.info = info;
    this.db = db;
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
