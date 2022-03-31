import { connect } from '../Models/Database';
import { schema, Order } from 'lovefield';
//import React from 'react';


class Business{
  constructor(info, db){
    this.info = info;
    this.db = db;
  }

  saveStockHist = async (stockHist) => {
    let stockHistory = this.db.getSchema().table('stockHistory');
    let row = stockHistory.createRow(stockHist);
    return (
      await this.db.insertOrReplace().into(stockHistory).values([row]).exec().then((row) => {
        return row;
      })
    )
  }

  saveCustomer = async (customer) => {
    let customers = this.db.getSchema().table('customers');
    let row = customers.createRow(customer);
    return (
      await this.db.insertOrReplace().into(customers).values([row]).exec().then((row) => {
        return row;
      })
    )
  }

  saveAccountReceivable =  async (ar) => {
    let receivables = this.db.getSchema().table('receivableAccounts');
    let row = receivables.createRow(ar);
    return (
      await this.db.insertOrReplace().into(receivables).values([row]).exec().then((row) => {
        return row;
      })
    )
  }

  saveSale = async (sale) => {
    //process stockHistory
    let stockList = await this.getStock();
    sale.data.soldItems.forEach(async (item, i) => {
      let stockId = null;
      stockList.forEach((stock) => {
        if(stock.title === item.particular){
          stockId = stock.id;
          return;
        }
      });

      if(stockId !== null){
        let stockHist = {
          stockId,
          amount: item.quantity,
          action: 'sell',
          date: sale.date,
        }

        let insertHist = await this.saveStockHist(stockHist);
        sale.data.soldItems[i].stockHistId = insertHist[0].id;
      }
      else{
        sale.data.soldItems[i].stockHistId = 0;
      }
    });

    //process account receivable
    let ar = {
      date: sale.date,
      amountDue: sale.data.total,
      amountPaid: sale.data.amountPaid,
      paymentHistory: [{
        date: sale.date,
        amount: sale.data.amountPaid,
      }],
      ref: 'sales',
      refId: 0,
    }

    let insertAr = await this.saveAccountReceivable(ar);
    sale.arId = insertAr[0].id;

    //save customer data if available // TODO: Keeping track of customers
    if(sale.data.customerName.trim().length > 0 && sale.data.customerDetails.trim().length > 0){
      let customer = {
        name: sale.data.customerName,
        details: sale.data.customerDetails,
        date: new Date(),
      }
      await this.saveCustomer(customer);
    }


    //then insert sale and update accountReceivable table
    let sales = this.db.getSchema().table('sales');
    let row = sales.createRow(sale);

    let arTable = this.db.getSchema().table('receivableAccounts');
    return (
      await this.db.insertOrReplace().into(sales).values([row]).exec().then((row) => {
        return this.db.update(arTable)
                      .set(arTable.refId, row[0].id)
                      .where(arTable.id.eq(insertAr[0].id))
                      .exec()
                      .then(() => {
                        return true;
                      })
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

  deleteStockHistory = async (id) => {
    let table = this.db.getSchema().table('stockHistory');
    return (
      await this.db.delete().from(table).where(table.id.eq(id)).exec().then(() => {
        return true;
      })
    );
  }

  deleteReceivableAccounts = async (id) => {
    let table = this.db.getSchema().table('receivableAccounts');
    return (
      await this.db.delete().from(table).where(table.id.eq(id)).exec().then(() => {
        return true;
      })
    );
  }

  deleteSale = async (sale) => {
    //delete stockHistory
    sale.data.soldItems.forEach(async (item) => {
      await this.deleteStockHistory(item.stockHistId);
    })

    //delete receivableAcc accs
    await this.deleteReceivableAccounts(sale.arId);

    //delete sale itself
    let sales = this.db.getSchema().table('sales');
    return (
      await this.db.delete().from(sales).where(sales.id.eq(sale.id)).exec().then(() => {
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

  getSales = async () => {
    let sales = this.db.getSchema().table('sales');
    return (
      await this.db.select().from(sales).orderBy(sales.id, Order.DESC).exec().then((rows) => {
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
