import { connect } from '../Models/Database';
import { schema, Order } from 'lovefield';
//import React from 'react';


export default class Business{
  constructor(db){
    this.db = db;
  }

  initialize = async () => {
    let info = this.db.getSchema().table('businessInfo');

    let rows = await this.db.select()
      .from(info)
      .orderBy(info.id, Order.DESC)
      .exec();
    if(rows.length > 0){
      //set business details
      this.name = rows[0]['name'];
      this.currency = rows[0]['currency'];
      this.TIN = rows[0]['TIN'];
    }
    else{
      //insert row
      let row = info.createRow({
        'id': 1,
        'name': 'BFARMS',
        'currency': 'Tsh',
        'TIN': '8766-8765-989'
      });

      this.db.insertOrReplace().into(info).values([row]).exec().then(
        (rows) => {
          this.name = rows[0]['name'];
          this.currency = rows[0]['currency'];
          this.TIN = rows[0]['TIN'];
        }
      );
    }
  }
}
