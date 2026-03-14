import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "resources_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"file_id" integer NOT NULL,
  	"file_size" varchar,
  	"file_type" varchar
  );
  
  CREATE TABLE "resources_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon" varchar NOT NULL
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Ressources & Téléchargements' NOT NULL,
  	"subtitle" varchar DEFAULT 'Retrouvez ici tous les documents, fiches et outils à télécharger pour vos parties de Daggerheart.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "resources_categories_items" ADD CONSTRAINT "resources_categories_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources_categories_items" ADD CONSTRAINT "resources_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_categories" ADD CONSTRAINT "resources_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "resources_categories_items_order_idx" ON "resources_categories_items" USING btree ("_order");
  CREATE INDEX "resources_categories_items_parent_id_idx" ON "resources_categories_items" USING btree ("_parent_id");
  CREATE INDEX "resources_categories_items_file_idx" ON "resources_categories_items" USING btree ("file_id");
  CREATE INDEX "resources_categories_order_idx" ON "resources_categories" USING btree ("_order");
  CREATE INDEX "resources_categories_parent_id_idx" ON "resources_categories" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "resources_categories_items" CASCADE;
  DROP TABLE "resources_categories" CASCADE;
  DROP TABLE "resources" CASCADE;`)
}
