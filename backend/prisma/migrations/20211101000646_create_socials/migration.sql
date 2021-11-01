/*
  Warnings:

  - You are about to drop the column `upvotes` on the `messages` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "socials" (
    "github" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "lkdin" TEXT NOT NULL,
    "user_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "socials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_messages" ("created_at", "id", "text", "user_id") SELECT "created_at", "id", "text", "user_id" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
