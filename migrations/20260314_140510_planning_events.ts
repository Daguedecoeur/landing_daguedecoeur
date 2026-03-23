import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_category" AS ENUM('newsletter', 'ressource', 'actualite', 'guide');
  CREATE TYPE "public"."enum_articles_featured_size" AS ENUM('featured', 'large', 'medium', 'small');
  CREATE TYPE "public"."enum_tags_color" AS ENUM('gold', 'cream', 'violet');
  CREATE TYPE "public"."enum_events_type" AS ENUM('stream', 'game-release', 'convention');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('discord', 'instagram', 'youtube', 'tiktok', 'patreon', 'twitter');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_articles_status" DEFAULT 'draft' NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb NOT NULL,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"category" "enum_articles_category",
  	"featured_size" "enum_articles_featured_size" DEFAULT 'small',
  	"raw_html" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"color" "enum_tags_color" DEFAULT 'gold',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_events_type" NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar,
  	"cover_image_id" integer,
  	"external_url" varchar,
  	"cta_label" varchar,
  	"location" varchar,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"articles_id" integer,
  	"tags_id" integer,
  	"media_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "decouvre_daggerheart_pain_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "decouvre_daggerheart_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "decouvre_daggerheart" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_title_start" varchar DEFAULT 'Plongez dans',
  	"header_title_highlight" varchar DEFAULT 'Daggerheart',
  	"header_subtitle" varchar DEFAULT 'Le jeu de rôle narratif de Darrington Press — rejoignez la communauté francophone.',
  	"pain_points_title" varchar DEFAULT 'Tu en as marre de…',
  	"solution_title" varchar DEFAULT 'Tu es au bon endroit.',
  	"solution_bio" varchar DEFAULT 'Je suis Dilhan, MJ depuis 10 ans, et j''ai créé Dague de Cœur pour t''aider à maîtriser Daggerheart sans te prendre la tête.',
  	"solution_signature" varchar DEFAULT 'Dilhan, fondateur de Dague de Cœur',
  	"benefits_title" varchar DEFAULT 'Ce que tu vas recevoir :',
  	"form_title" varchar DEFAULT 'Prêt à écrire ta propre légende ?',
  	"form_subtitle" varchar DEFAULT 'Reçois ton accès par email dans la minute.',
  	"form_first_name_placeholder" varchar DEFAULT 'Ton Prénom',
  	"form_email_placeholder" varchar DEFAULT 'Ton Email',
  	"form_acquisition_channel_label" varchar DEFAULT 'Comment es-tu tombé sur daguedecoeur.fr ?',
  	"form_submit_button_default" varchar DEFAULT 'TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀',
  	"form_submit_button_loading" varchar DEFAULT 'Envoi en cours...',
  	"form_disclaimer" varchar DEFAULT 'Pas de spam. Juste de l''aventure. Désinscription possible à tout moment.',
  	"success_title" varchar DEFAULT 'C''est fait !',
  	"success_message" varchar DEFAULT 'Ton Kit de Démarrage est en route vers ta boîte mail.',
  	"success_community_title" varchar DEFAULT 'En attendant, ne reste pas seul !',
  	"success_community_text" varchar DEFAULT 'La communauté t''attend pour t''accueillir.',
  	"success_community_cta" varchar DEFAULT 'REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾',
  	"success_community_link" varchar DEFAULT 'https://discord.com/invite/Wp5NKt56BX',
  	"success_signature_text" varchar DEFAULT 'À tout de suite de l''autre côté,',
  	"success_signature_name" varchar DEFAULT 'Dilhan.',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_kit_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title_start" varchar DEFAULT 'Lancez-vous dans le Jeu de Rôle avec',
  	"hero_title_highlight" varchar DEFAULT 'Daggerheart',
  	"hero_subtitle" varchar DEFAULT 'Rejoignez la 1ère communauté francophone de Daggerheart ! Initiation rapide au JDR, conseils de MJ et kit de démarrage gratuit à télécharger ici.',
  	"hero_cta_label" varchar DEFAULT '👇 TÉLÉCHARGER MON KIT DAGGERHEART GRATUIT',
  	"hero_social_proof" varchar DEFAULT 'Rejoignez déjà + 300 joueurs sur le Discord, + de 1000 abonnés sur nos réseaux et + de 500 inscrits à la newsletter.',
  	"features_title_start" varchar DEFAULT 'Pourquoi choisir',
  	"features_title_highlight" varchar DEFAULT 'Daggerheart',
  	"features_title_end" varchar DEFAULT 'pour débuter le JDR ?',
  	"features_video_cta" varchar DEFAULT '▶️ Voir le tutoriel vidéo signé par BBE',
  	"features_video_url" varchar DEFAULT 'https://www.youtube.com/watch?v=mX-ZTfLZeGg',
  	"kit_title_start" varchar DEFAULT 'Que contient votre',
  	"kit_title_highlight" varchar DEFAULT 'Kit d''Initiation Gratuit',
  	"kit_title_end" varchar DEFAULT ' ?',
  	"kit_publisher_note" varchar DEFAULT 'Publié par Black Book Editions',
  	"kit_section_label" varchar DEFAULT 'Votre butin pour démarrer :',
  	"kit_cta_label" varchar DEFAULT 'JE VEUX MON KIT GRATUIT',
  	"faq_title" varchar DEFAULT '❓ Foire Aux Questions (FAQ) Daggerheart & JDR',
  	"form_title" varchar DEFAULT 'Prêt à écrire ta propre légende ?',
  	"form_subtitle" varchar DEFAULT 'Reçois ton accès par email dans la minute.',
  	"form_first_name_placeholder" varchar DEFAULT 'Ton Prénom',
  	"form_email_placeholder" varchar DEFAULT 'Ton Email',
  	"form_acquisition_channel_label" varchar DEFAULT 'Comment es-tu tombé sur daguedecoeur.fr ?',
  	"form_submit_button_default" varchar DEFAULT 'TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀',
  	"form_submit_button_loading" varchar DEFAULT 'Envoi en cours...',
  	"form_disclaimer" varchar DEFAULT 'Pas de spam. Juste de l''aventure. Désinscription possible à tout moment.',
  	"success_title" varchar DEFAULT 'C''est fait !',
  	"success_message" varchar DEFAULT 'Ton Kit de Démarrage est en route vers ta boîte mail (vérifie tes spams, les gobelins les cachent parfois).',
  	"success_community_title" varchar DEFAULT 'En attendant, ne reste pas seul !',
  	"success_community_text" varchar DEFAULT 'La communauté t''attend pour t''accueillir.',
  	"success_community_cta" varchar DEFAULT 'REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾',
  	"success_community_link" varchar DEFAULT 'https://discord.com/invite/Wp5NKt56BX',
  	"success_signature_text" varchar DEFAULT 'À tout de suite de l''autre côté,',
  	"success_signature_name" varchar DEFAULT 'Dilhan.',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_community_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Dague de Coeur',
  	"site_description" varchar DEFAULT 'La communauté francophone de Daggerheart — le JDR créé par Critical Role / Darrington Press.',
  	"discord_link" varchar DEFAULT 'https://discord.com/invite/Wp5NKt56BX',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navbar_menu_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"description" varchar,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"emoji" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "navbar_mobile_menu_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"description" varchar,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "navbar_mobile_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"emoji" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "navbar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'DAGUE DE CŒUR' NOT NULL,
  	"cta_label" varchar DEFAULT 'Espace Membre',
  	"cta_mobile_label" varchar DEFAULT 'Espace Membre / S''inscrire',
  	"cta_href" varchar DEFAULT '/#subscribe',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "newsletter_preferences_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Vos Préférences Newsletter',
  	"subtitle" varchar DEFAULT 'Choisissez les newsletters que vous souhaitez recevoir.',
  	"unsubscribe_warning" varchar DEFAULT 'Quel dommage de vous voir partir… Vous manquerez nos meilleurs conseils de Maître du Jeu et nos récaps mensuels.',
  	"confirm_label" varchar DEFAULT 'Oui, je suis sûr(e)',
  	"cancel_label" varchar DEFAULT 'Non, je reste !',
  	"success_message" varchar DEFAULT 'Vos préférences ont été mises à jour !',
  	"cta_title" varchar DEFAULT 'Envie de rejoindre la communauté ?',
  	"cta_description" varchar DEFAULT 'Créez un compte pour accéder à tous vos outils de Maître du Jeu, gérer votre profil et bien plus encore.',
  	"cta_button_label" varchar DEFAULT 'Créer un compte',
  	"cta_button_href" varchar DEFAULT '/signup',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "legal_mentions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Mentions Légales & RGPD' NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partners_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nos Partenaires' NOT NULL,
  	"subtitle" varchar DEFAULT 'Les alliés qui rendent notre aventure possible.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tools_categories_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon" varchar DEFAULT 'link'
  );
  
  CREATE TABLE "tools_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon" varchar NOT NULL
  );
  
  CREATE TABLE "tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Outils & Ressources' NOT NULL,
  	"subtitle" varchar DEFAULT 'L''annuaire ultime des outils, médias et communautés pour sublimer vos parties de Daggerheart.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_and_locations_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"cta_label" varchar DEFAULT 'Découvrir →',
  	"cta_href" varchar DEFAULT '#',
  	"image_id" integer
  );
  
  CREATE TABLE "projects_and_locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "planning_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Planning',
  	"hero_subtitle" varchar DEFAULT 'Ne manquez aucun événement de la communauté',
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decouvre_daggerheart_pain_points_points" ADD CONSTRAINT "decouvre_daggerheart_pain_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."decouvre_daggerheart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decouvre_daggerheart_benefits_items" ADD CONSTRAINT "decouvre_daggerheart_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."decouvre_daggerheart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decouvre_daggerheart" ADD CONSTRAINT "decouvre_daggerheart_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_features_items" ADD CONSTRAINT "homepage_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_kit_items" ADD CONSTRAINT "homepage_kit_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_faq_items" ADD CONSTRAINT "homepage_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_nav_links" ADD CONSTRAINT "site_settings_footer_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_community_links" ADD CONSTRAINT "site_settings_footer_community_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_legal_links" ADD CONSTRAINT "site_settings_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_menu_items_children" ADD CONSTRAINT "navbar_menu_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_menu_items" ADD CONSTRAINT "navbar_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_mobile_menu_items_children" ADD CONSTRAINT "navbar_mobile_menu_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_mobile_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_mobile_menu_items" ADD CONSTRAINT "navbar_mobile_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_partners" ADD CONSTRAINT "partners_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_partners" ADD CONSTRAINT "partners_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_categories_links" ADD CONSTRAINT "tools_categories_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_categories" ADD CONSTRAINT "tools_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_and_locations_locations" ADD CONSTRAINT "projects_and_locations_locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_and_locations_locations" ADD CONSTRAINT "projects_and_locations_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_and_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "planning_page" ADD CONSTRAINT "planning_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX "articles_meta_meta_image_idx" ON "articles" USING btree ("meta_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_tags_id_idx" ON "articles_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "decouvre_daggerheart_pain_points_points_order_idx" ON "decouvre_daggerheart_pain_points_points" USING btree ("_order");
  CREATE INDEX "decouvre_daggerheart_pain_points_points_parent_id_idx" ON "decouvre_daggerheart_pain_points_points" USING btree ("_parent_id");
  CREATE INDEX "decouvre_daggerheart_benefits_items_order_idx" ON "decouvre_daggerheart_benefits_items" USING btree ("_order");
  CREATE INDEX "decouvre_daggerheart_benefits_items_parent_id_idx" ON "decouvre_daggerheart_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "decouvre_daggerheart_meta_meta_image_idx" ON "decouvre_daggerheart" USING btree ("meta_image_id");
  CREATE INDEX "homepage_features_items_order_idx" ON "homepage_features_items" USING btree ("_order");
  CREATE INDEX "homepage_features_items_parent_id_idx" ON "homepage_features_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_kit_items_order_idx" ON "homepage_kit_items" USING btree ("_order");
  CREATE INDEX "homepage_kit_items_parent_id_idx" ON "homepage_kit_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_faq_items_order_idx" ON "homepage_faq_items" USING btree ("_order");
  CREATE INDEX "homepage_faq_items_parent_id_idx" ON "homepage_faq_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_meta_meta_image_idx" ON "homepage" USING btree ("meta_image_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_nav_links_order_idx" ON "site_settings_footer_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_nav_links_parent_id_idx" ON "site_settings_footer_nav_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_community_links_order_idx" ON "site_settings_footer_community_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_community_links_parent_id_idx" ON "site_settings_footer_community_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_legal_links_order_idx" ON "site_settings_footer_legal_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_legal_links_parent_id_idx" ON "site_settings_footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "navbar_menu_items_children_order_idx" ON "navbar_menu_items_children" USING btree ("_order");
  CREATE INDEX "navbar_menu_items_children_parent_id_idx" ON "navbar_menu_items_children" USING btree ("_parent_id");
  CREATE INDEX "navbar_menu_items_order_idx" ON "navbar_menu_items" USING btree ("_order");
  CREATE INDEX "navbar_menu_items_parent_id_idx" ON "navbar_menu_items" USING btree ("_parent_id");
  CREATE INDEX "navbar_mobile_menu_items_children_order_idx" ON "navbar_mobile_menu_items_children" USING btree ("_order");
  CREATE INDEX "navbar_mobile_menu_items_children_parent_id_idx" ON "navbar_mobile_menu_items_children" USING btree ("_parent_id");
  CREATE INDEX "navbar_mobile_menu_items_order_idx" ON "navbar_mobile_menu_items" USING btree ("_order");
  CREATE INDEX "navbar_mobile_menu_items_parent_id_idx" ON "navbar_mobile_menu_items" USING btree ("_parent_id");
  CREATE INDEX "partners_partners_order_idx" ON "partners_partners" USING btree ("_order");
  CREATE INDEX "partners_partners_parent_id_idx" ON "partners_partners" USING btree ("_parent_id");
  CREATE INDEX "partners_partners_logo_idx" ON "partners_partners" USING btree ("logo_id");
  CREATE INDEX "tools_categories_links_order_idx" ON "tools_categories_links" USING btree ("_order");
  CREATE INDEX "tools_categories_links_parent_id_idx" ON "tools_categories_links" USING btree ("_parent_id");
  CREATE INDEX "tools_categories_order_idx" ON "tools_categories" USING btree ("_order");
  CREATE INDEX "tools_categories_parent_id_idx" ON "tools_categories" USING btree ("_parent_id");
  CREATE INDEX "projects_and_locations_locations_order_idx" ON "projects_and_locations_locations" USING btree ("_order");
  CREATE INDEX "projects_and_locations_locations_parent_id_idx" ON "projects_and_locations_locations" USING btree ("_parent_id");
  CREATE INDEX "projects_and_locations_locations_image_idx" ON "projects_and_locations_locations" USING btree ("image_id");
  CREATE INDEX "planning_page_hero_hero_background_image_idx" ON "planning_page" USING btree ("hero_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "decouvre_daggerheart_pain_points_points" CASCADE;
  DROP TABLE "decouvre_daggerheart_benefits_items" CASCADE;
  DROP TABLE "decouvre_daggerheart" CASCADE;
  DROP TABLE "homepage_features_items" CASCADE;
  DROP TABLE "homepage_kit_items" CASCADE;
  DROP TABLE "homepage_faq_items" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_footer_nav_links" CASCADE;
  DROP TABLE "site_settings_footer_community_links" CASCADE;
  DROP TABLE "site_settings_footer_legal_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navbar_menu_items_children" CASCADE;
  DROP TABLE "navbar_menu_items" CASCADE;
  DROP TABLE "navbar_mobile_menu_items_children" CASCADE;
  DROP TABLE "navbar_mobile_menu_items" CASCADE;
  DROP TABLE "navbar" CASCADE;
  DROP TABLE "newsletter_preferences_page" CASCADE;
  DROP TABLE "legal_mentions" CASCADE;
  DROP TABLE "partners_partners" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "tools_categories_links" CASCADE;
  DROP TABLE "tools_categories" CASCADE;
  DROP TABLE "tools" CASCADE;
  DROP TABLE "projects_and_locations_locations" CASCADE;
  DROP TABLE "projects_and_locations" CASCADE;
  DROP TABLE "planning_page" CASCADE;
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_articles_category";
  DROP TYPE "public"."enum_articles_featured_size";
  DROP TYPE "public"."enum_tags_color";
  DROP TYPE "public"."enum_events_type";
  DROP TYPE "public"."enum_site_settings_social_links_platform";`)
}
