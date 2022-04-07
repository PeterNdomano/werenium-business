import { schema, Type,} from 'lovefield';

const sb = schema.create('wb2', 2);

//create businessInfo Table
sb.createTable('businessInfo')
  .addColumn('id', Type.INTEGER)
  .addColumn('name', Type.STRING)
  .addColumn('currency', Type.STRING)
  .addColumn('TIN', Type.STRING)
  .addPrimaryKey(['id'], true);

sb.createTable('stock')
  .addColumn('id', Type.INTEGER)
  .addColumn('title', Type.STRING)
  .addColumn('quantity', Type.INTEGER)
  .addColumn('unit', Type.STRING)
  .addColumn('bPrice', Type.INTEGER)
  .addColumn('sPrice', Type.INTEGER)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true)

sb.createTable('sales')
  .addColumn('id', Type.INTEGER)
  .addColumn('arId', Type.INTEGER)
  .addColumn('data', Type.OBJECT)
  .addColumn('proforma', Type.BOOLEAN)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);

sb.createTable('stockHistory')
  .addColumn('id', Type.INTEGER)
  .addColumn('stockId', Type.INTEGER)
  .addColumn('amount', Type.INTEGER)
  .addColumn('action', Type.STRING)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);



sb.createTable('receivableAccounts')
  .addColumn('id', Type.INTEGER)
  .addColumn('refId', Type.INTEGER)
  .addColumn('ref', Type.STRING)
  .addColumn('amountDue', Type.INTEGER)
  .addColumn('amountPaid', Type.INTEGER)
  .addColumn('paymentHistory', Type.OBJECT)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);

sb.createTable('payableAccounts')
  .addColumn('id', Type.INTEGER)
  .addColumn('refId', Type.INTEGER)
  .addColumn('ref', Type.STRING)
  .addColumn('amountDue', Type.INTEGER)
  .addColumn('amountPaid', Type.INTEGER)
  .addColumn('paymentHistory', Type.OBJECT)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);

sb.createTable('customers')
  .addColumn('id', Type.INTEGER)
  .addColumn('name', Type.STRING)
  .addColumn('details', Type.STRING)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);

sb.createTable('incomes')
  .addColumn('id', Type.INTEGER)
  .addColumn('description', Type.STRING)
  .addColumn('amount', Type.INTEGER)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);

sb.createTable('expenses')
  .addColumn('id', Type.INTEGER)
  .addColumn('description', Type.STRING)
  .addColumn('amount', Type.INTEGER)
  .addColumn('date', Type.DATE_TIME)
  .addPrimaryKey(['id'], true);

function onUpgrade(rawDb){
  //console.log(raw.getVersion());
  //handle database upgrade here
  return rawDb.addTableColumn('sales', 'arId', 0).then(() => {
      return rawDb.dump();
  })

}

export function connect(){
  return sb.connect({
    onUpgrade: onUpgrade
  });
}
