CREATE TABLE "happy_hour_settings" (
  "id" INTEGER NOT NULL PRIMARY KEY,
  "start_at" DATETIME NOT NULL,
  "set_by_telegram_id" BIGINT NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);
