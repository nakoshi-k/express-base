## モデルの作成
sequelize model:create --name items --underscored --attributes name:string,url:string,price:integer,caption:text,brand_id:integer,category_id:integer

npm run db:model:create  -- --name item --attributes name:string,url:string,price:integer,caption:text,brand_id:integer,category_id:integer
## マイグレーションの実行
sequelize db:migrate

npm run db:migrate
## 直前のマイグレーションのロールバック
sequelize db:migrate:undo

npm run db:migrate:undo

```
npm run db:model:create -- --name user_profiles --attributes user_id:string,first_name:string,last_name:string,first_name_kana:string,last_name_kana:string,birthday:date
```