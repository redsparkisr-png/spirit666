UPDATE auth.users
SET encrypted_password = crypt('Pinkfloyd40!', gen_salt('bf')),
    updated_at = now()
WHERE email = 'redboll@gmail.com';