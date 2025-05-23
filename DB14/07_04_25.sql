PGDMP                       }            Cafe website DB    14.5    17.2 1    2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            5           1262    16490    Cafe website DB    DATABASE     �   CREATE DATABASE "Cafe website DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
 !   DROP DATABASE "Cafe website DB";
                     postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                     postgres    false            6           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                        postgres    false    4            �            1259    16491    bookings    TABLE       CREATE TABLE public.bookings (
    user_name character varying,
    time_from time with time zone NOT NULL,
    time_to time with time zone NOT NULL,
    contacts character varying NOT NULL,
    notes character varying,
    id bigint NOT NULL,
    state smallint DEFAULT 0 NOT NULL
);
    DROP TABLE public.bookings;
       public         heap r       postgres    false    4            �            1259    16497    bookings_id_seq    SEQUENCE     x   CREATE SEQUENCE public.bookings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.bookings_id_seq;
       public               postgres    false    4    209            7           0    0    bookings_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;
          public               postgres    false    210            �            1259    16498    bookings_tables    TABLE     l   CREATE TABLE public.bookings_tables (
    booking_id bigint NOT NULL,
    table_number smallint NOT NULL
);
 #   DROP TABLE public.bookings_tables;
       public         heap r       postgres    false    4            �            1259    16501    bookings_users    TABLE     (   CREATE TABLE public.bookings_users (
);
 "   DROP TABLE public.bookings_users;
       public         heap r       postgres    false    4            �            1259    16504    goods    TABLE     �   CREATE TABLE public.goods (
    goods_name character varying,
    price numeric(7,2),
    "group" smallint,
    id integer NOT NULL,
    discription character varying
);
    DROP TABLE public.goods;
       public         heap r       postgres    false    4            �            1259    16509    goods_nid_seq    SEQUENCE     �   CREATE SEQUENCE public.goods_nid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.goods_nid_seq;
       public               postgres    false    213    4            8           0    0    goods_nid_seq    SEQUENCE OWNED BY     >   ALTER SEQUENCE public.goods_nid_seq OWNED BY public.goods.id;
          public               postgres    false    214            �            1259    16510    orders    TABLE     �   CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_name character varying,
    address character varying,
    "time" time with time zone,
    contacts character varying,
    state smallint DEFAULT 0
);
    DROP TABLE public.orders;
       public         heap r       postgres    false    4            �            1259    16516    orders_goods    TABLE     �   CREATE TABLE public.orders_goods (
    order_id bigint NOT NULL,
    goods_id bigint NOT NULL,
    quantity smallint NOT NULL
);
     DROP TABLE public.orders_goods;
       public         heap r       postgres    false    4            �            1259    16519    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public               postgres    false    4    215            9           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public               postgres    false    217            �            1259    16520    orders_users    TABLE     &   CREATE TABLE public.orders_users (
);
     DROP TABLE public.orders_users;
       public         heap r       postgres    false    4            �            1259    16523    tables    TABLE     �   CREATE TABLE public.tables (
    number smallint NOT NULL,
    seats smallint DEFAULT 1 NOT NULL,
    position_x smallint DEFAULT 1 NOT NULL,
    position_y smallint DEFAULT 1 NOT NULL
);
    DROP TABLE public.tables;
       public         heap r       postgres    false    4            �            1259    16529    users    TABLE     \  CREATE TABLE public.users (
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    address character varying(30),
    birthday_date date,
    email character varying(30) NOT NULL,
    telephone_number numeric(10,0),
    password character varying(30) NOT NULL,
    user_type smallint DEFAULT 0 NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false    4            ~           2604    16533    bookings id    DEFAULT     j   ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);
 :   ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    210    209            �           2604    16534    goods id    DEFAULT     e   ALTER TABLE ONLY public.goods ALTER COLUMN id SET DEFAULT nextval('public.goods_nid_seq'::regclass);
 7   ALTER TABLE public.goods ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    214    213            �           2604    16535 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    215            $          0    16491    bookings 
   TABLE DATA           ]   COPY public.bookings (user_name, time_from, time_to, contacts, notes, id, state) FROM stdin;
    public               postgres    false    209   59       &          0    16498    bookings_tables 
   TABLE DATA           C   COPY public.bookings_tables (booking_id, table_number) FROM stdin;
    public               postgres    false    211   �9       '          0    16501    bookings_users 
   TABLE DATA           (   COPY public.bookings_users  FROM stdin;
    public               postgres    false    212   �9       (          0    16504    goods 
   TABLE DATA           L   COPY public.goods (goods_name, price, "group", id, discription) FROM stdin;
    public               postgres    false    213   :       *          0    16510    orders 
   TABLE DATA           Q   COPY public.orders (id, user_name, address, "time", contacts, state) FROM stdin;
    public               postgres    false    215   �:       +          0    16516    orders_goods 
   TABLE DATA           D   COPY public.orders_goods (order_id, goods_id, quantity) FROM stdin;
    public               postgres    false    216   ;       -          0    16520    orders_users 
   TABLE DATA           &   COPY public.orders_users  FROM stdin;
    public               postgres    false    218   B;       .          0    16523    tables 
   TABLE DATA           G   COPY public.tables (number, seats, position_x, position_y) FROM stdin;
    public               postgres    false    219   _;       /          0    16529    users 
   TABLE DATA           |   COPY public.users (first_name, last_name, address, birthday_date, email, telephone_number, password, user_type) FROM stdin;
    public               postgres    false    220   �;       :           0    0    bookings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.bookings_id_seq', 16, true);
          public               postgres    false    210            ;           0    0    goods_nid_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.goods_nid_seq', 6, true);
          public               postgres    false    214            <           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 9, true);
          public               postgres    false    217            �           2606    16537    bookings bookings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public                 postgres    false    209            �           2606    16539    goods goods_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.goods
    ADD CONSTRAINT goods_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.goods DROP CONSTRAINT goods_pkey;
       public                 postgres    false    213            �           2606    16541    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    215            �           2606    16543    tables tables_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (number);
 <   ALTER TABLE ONLY public.tables DROP CONSTRAINT tables_pkey;
       public                 postgres    false    219            �           2606    16545    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    220            �           2606    16546 0   bookings_tables bookings_tables_bookings_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings_tables
    ADD CONSTRAINT bookings_tables_bookings_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) NOT VALID;
 Z   ALTER TABLE ONLY public.bookings_tables DROP CONSTRAINT bookings_tables_bookings_id_fkey;
       public               postgres    false    3208    211    209            �           2606    16551 1   bookings_tables bookings_tables_bookings_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings_tables
    ADD CONSTRAINT bookings_tables_bookings_id_fkey1 FOREIGN KEY (booking_id) REFERENCES public.bookings(id) NOT VALID;
 [   ALTER TABLE ONLY public.bookings_tables DROP CONSTRAINT bookings_tables_bookings_id_fkey1;
       public               postgres    false    209    211    3208            �           2606    16556 2   bookings_tables bookings_tables_tables_number_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings_tables
    ADD CONSTRAINT bookings_tables_tables_number_fkey FOREIGN KEY (table_number) REFERENCES public.tables(number) NOT VALID;
 \   ALTER TABLE ONLY public.bookings_tables DROP CONSTRAINT bookings_tables_tables_number_fkey;
       public               postgres    false    211    219    3214            �           2606    16561 3   bookings_tables bookings_tables_tables_number_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings_tables
    ADD CONSTRAINT bookings_tables_tables_number_fkey1 FOREIGN KEY (table_number) REFERENCES public.tables(number) NOT VALID;
 ]   ALTER TABLE ONLY public.bookings_tables DROP CONSTRAINT bookings_tables_tables_number_fkey1;
       public               postgres    false    211    3214    219            �           2606    16566 '   orders_goods orders_goods_goods_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_goods
    ADD CONSTRAINT orders_goods_goods_id_fkey FOREIGN KEY (goods_id) REFERENCES public.goods(id) NOT VALID;
 Q   ALTER TABLE ONLY public.orders_goods DROP CONSTRAINT orders_goods_goods_id_fkey;
       public               postgres    false    213    216    3210            �           2606    16571 (   orders_goods orders_goods_goods_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_goods
    ADD CONSTRAINT orders_goods_goods_id_fkey1 FOREIGN KEY (goods_id) REFERENCES public.goods(id) NOT VALID;
 R   ALTER TABLE ONLY public.orders_goods DROP CONSTRAINT orders_goods_goods_id_fkey1;
       public               postgres    false    216    3210    213            �           2606    16576 (   orders_goods orders_goods_orders_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_goods
    ADD CONSTRAINT orders_goods_orders_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) NOT VALID;
 R   ALTER TABLE ONLY public.orders_goods DROP CONSTRAINT orders_goods_orders_id_fkey;
       public               postgres    false    3212    216    215            �           2606    16581 )   orders_goods orders_goods_orders_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_goods
    ADD CONSTRAINT orders_goods_orders_id_fkey1 FOREIGN KEY (order_id) REFERENCES public.orders(id) NOT VALID;
 S   ALTER TABLE ONLY public.orders_goods DROP CONSTRAINT orders_goods_orders_id_fkey1;
       public               postgres    false    216    215    3212            $   z   x��0���[/��$wrY ���9��)�maihladdfld���i�i�uM����)L���1�#c������R�N3,Z��,5C�3�K��,�0¢��:S�Vqq��qqq "�PR      &   %   x�3�4�2�4�2�4�24�4�\�f��\1z\\\ C�      '      x������ � �      (   v   x�-��� ���
�Ul��x4޽z�U����H9M���p��ZVR F�\y�GOǓ�Ψ�d�S�q�-U�0Ğ�{�;M�ּn�O��ȋ�*���	>���]%�x <�=�      *   h   x���0���[/��$wr^��@�/콰����.6 �vqXZX[����i�s���;�&f���rqYm�������042��a����� GP      +   #   x���4�4��4��@��6���F\1z\\\ NgI      -      x������ � �      .   4   x�3�4A.i����H��ō�L�|c.30߄��΄�,n����� �5      /   �   x��0���[/��$wr^ r/6]l���{9c�@�#��8�����!713G��������Drp]�ke@ѽ@���=@v���
����_آ`�ihii�kh�k`��Q�W�Z�����R�����P����Z����������� l�1W� �[\     