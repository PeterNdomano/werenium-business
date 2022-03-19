import { schema, Type,} from 'lovefield';

const sb = schema.create('wb', 4);

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

function onUpgrade(raw){
  //console.log(raw.getVersion());
  //handle database upgrade here
  return raw.dump();
}

export function connect(){
  return sb.connect({
    onUpgrade: onUpgrade
  });
}
