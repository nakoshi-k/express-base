## モデルの作成
sequelize model:create --name items --underscored --attributes name:string,url:string,price:integer,caption:text,brand_id:integer,category_id:integer

## マイグレーションの実行
sequelize db:migrate

## 直前のマイグレーションのロールバック
sequelize db:migrate:undo
