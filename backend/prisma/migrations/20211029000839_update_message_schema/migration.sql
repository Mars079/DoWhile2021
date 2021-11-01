/*
  Warnings:

  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_messages" ("created_at", "id", "text", "user_id") SELECT "created_at", "id", "text", "user_id" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
