CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_updatedAt()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = now(); 
   RETURN NEW;
END;
$$ language "plpgsql";

CREATE TABLE "users" (
  "userId" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "email" VARCHAR NOT NULL,
  "emailVerificationCode" VARCHAR,
  "emailVerified" BOOLEAN DEFAULT FALSE NOT NULL,
  "password" VARCHAR NOT NULL,
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "alias" VARCHAR,
  "phoneNumber" VARCHAR,
  "phoneNumberVerificationCode" VARCHAR,
  "phoneNumberVerificationCodeExpiredAt" TIMESTAMPTZ,
  "phoneNumberVerified" BOOLEAN DEFAULT FALSE NOT NULL,
  "admin" BOOLEAN DEFAULT FALSE NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  "powerProvider" VARCHAR,
  "powerProviderId" VARCHAR,
  "spendableBalance" NUMERIC(10,2) DEFAULT 0.00,
  "customerUniqueReference" VARCHAR(10),
  "idVerified" BOOLEAN DEFAULT FALSE NOT NULL,
  PRIMARY KEY("userId"),
  UNIQUE("email"),
  UNIQUE("phoneNumber")
);

CREATE TRIGGER update_users_updatedAt BEFORE UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE 
  update_updatedAt();


CREATE TABLE "addresses" (
        "userId" UUID NOT NULL,
        "address1" VARCHAR(120) NOT NULL,
        "address2" VARCHAR(120),
        "state" CHAR(3) NOT NULL,
        "postCode" VARCHAR(4) NOT NULL,
        PRIMARY KEY ("userId"),
        FOREIGN KEY ("userId") REFERENCES "users"("userId")
);