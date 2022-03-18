import { schema, Type} from 'lovefield';

const sb = schema.create('wb', 1);

//create businessInfo Table
sb.createTable('businessInfo')
  .addColumn('id', Type.INTEGER)
  .addColumn('name', Type.STRING)
  .addColumn('currency', Type.STRING)
  .addColumn('TIN', Type.STRING)
  .addPrimaryKey(['id'], true);


export function connect(){
  return sb.connect();
}
