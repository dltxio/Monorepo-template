INSERT INTO "users" 
  (
    "userId",
    "email",
    "password",
    "phoneNumberVerified",
    "emailVerified",
    "idVerified",
    "alias",
    "firstName",
    "lastName"
  )
  VALUES (
    '09ebefb5-1e2d-4047-8856-0227c9de5ae4',
    'dev.power@powerPlay.com',
    -- Password123!
    '$2b$10$Ycq3eYn6vHaEdb42s5PY7ekBRI93jjg1iYUA2a/qUDpIYeQ5VJL1i',
    FALSE,
    FALSE,
    FALSE,
    'PowerGuy',
    'powerPlayer',
    'dev'
  );

INSERT INTO "addresses"
  (
    "userId",
    "address1",
    "address2",
    "state",
    "postCode"
  )
  VALUES (
    '09ebefb5-1e2d-4047-8856-0227c9de5ae4',
    '123 Fake St',
    '',
    'QLD',
    '4075'
  );