PGDMP                      |            DMS    15.7    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    DMS    DATABASE     �   CREATE DATABASE "DMS" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "DMS";
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    33302 
   department    TABLE     �   CREATE TABLE public.department (
    dept_id integer NOT NULL,
    dept_name character varying(50),
    dept_fullname character varying(255),
    division character varying(255),
    factory character varying(255)
);
    DROP TABLE public.department;
       public         heap    postgres    false    4            �            1259    33287    gradecategory    TABLE     z   CREATE TABLE public.gradecategory (
    grade_id integer,
    grade_name character varying(5),
    grade_level integer
);
 !   DROP TABLE public.gradecategory;
       public         heap    postgres    false    4            �            1259    33290    rolecategory    TABLE     w   CREATE TABLE public.rolecategory (
    role_id integer,
    role_name character varying(50),
    role_level integer
);
     DROP TABLE public.rolecategory;
       public         heap    postgres    false    4            �            1259    33310    userrole    TABLE     9  CREATE TABLE public.userrole (
    user_role_id integer NOT NULL,
    user_id integer,
    dept_id integer,
    tpi_role_id integer,
    mr_role_id integer,
    po_role_id integer,
    die_role_id integer,
    dtf_role_id integer,
    dsum_role_id integer,
    dispose_role_id integer,
    dcf_role_id integer
);
    DROP TABLE public.userrole;
       public         heap    postgres    false    4            �            1259    33309    userrole_user_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.userrole_user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.userrole_user_role_id_seq;
       public          postgres    false    218    4                       0    0    userrole_user_role_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.userrole_user_role_id_seq OWNED BY public.userrole.user_role_id;
          public          postgres    false    217            �            1259    33333    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(100),
    user_code character varying(100),
    password character varying(100),
    buyer_code character varying(100),
    grade_id integer,
    email character varying(100),
    is_admin boolean,
    is_verified boolean,
    is_active boolean,
    is_delete boolean,
    lock_reason text,
    last_online timestamp without time zone,
    create_date timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    33332    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    4    220                       0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    219            v           2604    33313    userrole user_role_id    DEFAULT     ~   ALTER TABLE ONLY public.userrole ALTER COLUMN user_role_id SET DEFAULT nextval('public.userrole_user_role_id_seq'::regclass);
 D   ALTER TABLE public.userrole ALTER COLUMN user_role_id DROP DEFAULT;
       public          postgres    false    217    218    218            w           2604    33336    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    219    220    220                      0    33302 
   department 
   TABLE DATA           Z   COPY public.department (dept_id, dept_name, dept_fullname, division, factory) FROM stdin;
    public          postgres    false    216                    0    33287    gradecategory 
   TABLE DATA           J   COPY public.gradecategory (grade_id, grade_name, grade_level) FROM stdin;
    public          postgres    false    214   �                 0    33290    rolecategory 
   TABLE DATA           F   COPY public.rolecategory (role_id, role_name, role_level) FROM stdin;
    public          postgres    false    215                     0    33310    userrole 
   TABLE DATA           �   COPY public.userrole (user_role_id, user_id, dept_id, tpi_role_id, mr_role_id, po_role_id, die_role_id, dtf_role_id, dsum_role_id, dispose_role_id, dcf_role_id) FROM stdin;
    public          postgres    false    218   c                  0    33333    users 
   TABLE DATA           �   COPY public.users (user_id, user_name, user_code, password, buyer_code, grade_id, email, is_admin, is_verified, is_active, is_delete, lock_reason, last_online, create_date) FROM stdin;
    public          postgres    false    220   Q(                  0    0    userrole_user_role_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.userrole_user_role_id_seq', 331, true);
          public          postgres    false    217                       0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          postgres    false    219            y           2606    33308    department department_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (dept_id);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public            postgres    false    216            {           2606    33315    userrole userrole_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_pkey PRIMARY KEY (user_role_id);
 @   ALTER TABLE ONLY public.userrole DROP CONSTRAINT userrole_pkey;
       public            postgres    false    218            }           2606    33340    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220                 x�m�K��0��}��$��(��*0i��z�s��lX}�O�&�n�yK	���:-��H� y U�Z���$����C��E�5��k-%�r��e4�]8OA��yӏ�4I]Ⰲ���O�j%�5Z�j!��J�r�%�s��xګ�g�>\0O������'�4I\��Ѣ�V�܈�PBO���d��w��ϧ���|0&���x�D?׊G{[����m�8�[
M\2ķ��=�7�w�ga�8��_
~����K�oD��Q�^         S   x�̻�0�x�Ğ?@�dq�;��:0ѼhL+� T�BQ%+U�l4u��u0͡�;'�.V.yg<��a99p��P�n�>eMm         R   x�3���/QH-��,�4�2�JML���˩�4�2�t�HM��4�2�t,((�/K�4�2�tM*6�2�tL����4����� 
~$         �  x�u�Y��(�U�S�]���p!��K�.y��A�A�f�'��ןo?����|\�4���ǿ�o������q�n�Uüڶv^��*���_m�ec�]\�"]��s^��\}?.&�@.���cU���m������=����y^o�G3��������c��g	��Q��N���������hs� �A�|ly���[���K�q�(���]��{�Tw�jg]k�sq�����g+��%�D	����D�$*�,+��"Q�'dW���H?#r ldi�i�gi#c#�B��6�c��F��{�26���������,mldi�`�HE�(�(�F�F�6
6�����-�(�F�F�6
6��Q�Q��k�U���2^�A��d�0KG�,��f�Q|��Z .T@�\�f�hT�����^��,� ���a#n�6�
a#jem;>��_�F�3�a��հEO�
�E�F��ׁ�EE���(*��c�]��ʎ�.���n�^؈�
a#�*������FU��FUQT���.mlt9�G���1H6cdPSI`P=$g����x���p�C�G�E�1E��}%�l+�u�~��7J������_��b�Jc{��dﷆ����@r嵽o&e���v?Cs9�X��:JEƬ��߾E̬��=�6Y�9��,����4X���E�*�.�rVe:�I4@3�~P�ϊ�;�-�9JL*q�����19!!aL����BG�R&m864G�u�ZB��ٟ�����1b	n��ZD�l�^�
3h�&F�l��]�������&6��o���?v,9c���*5@Y-p��18�Lڏ����B�ω�%�!I�����d�I�\E���덿v����z{��T��N���.;;�=���M�f,rg7���������
,iVa6?��8�bg~�rH�	&VRS��*Z���+�z(��VVђ�4y��+Vt������b�ط�a��������_@H)�j���@8)E����Ȍj'1�q�pެ��=��m()rmj�r�n�AP��G���t��Ѭ5�{���::b �сut� H���rM�K~�G��3|-���5�7�G3Y
�%�GK�B|�KP�AiE���	b��4����v
�:�g{��O͚�ד1p����d�t�NH���c���$R�,� ��3ߑ��1Ҏ����<ECJ�[gߑ������'C��c�2z�>��D�n�q�R�Z�Cʐ/Sߑ2�3�yd���!�;nHj����"{xİ�lN����
���F}�
��(I�c[�pԱ-�XU{J�t���ܰ��"ul�~�h��E<��>f��+�����Ǌ�fX1�+�����b�D�BH�"-w�X�7K8	�����b],�pr��ӁP�ZIB�k%	%>���%�p.�PB�gY%^��z"�p�|�2F�,��]����|#~̒��m�(	Ӓ�$G'�mzM،���$}��D(IY� %I*!�b�6|�"�"Z���i�p��j�b ���ϧ����ډ��}#�b�T�8,�e�8�Uu� �i�P��D�����}������q�_�֪�X�����%�Z2��"[��2�p�9"�bZ�"���Q_CC|�3�~&��bI#���D��qȯ��#u��bV�R�}��v�E3�̜��Ȱ��S�dXLK��P-Vµdh��Y1�p��ZB�dx	ߒ�%|K���I��i/$Y��7�/��r�����M3���K��/2�:Q߲�h�ZY���JDYt������+�*��#��̳N�Q���J?R8�U)a[��D���{�-A�(�ev`Hu��ddYl�q;�,���w9��q�=>�D!�b|Y۪�dYl7�*(�1 �b[��+K"�b[5�,�m�֟;��
a��~�YtK�¬bh1��ۡ��:�>Z,�졓4���Ky։�r�g���ܣ�q�ޟ����������            x��][W��~��~�'�t/O����L���Z�Rn�&��}������T%�]e���4,�ג���ۗ�����u�8�V?N�k�Z��-�/��P������K����?���c�X��?�����y!�PG��r��1�ǌ�g���	c���Q�6s�~�/��r2ŏߟ�����������r��#@l �GLNxy,��,����|19% a�6)��2G\M�:�lH�ϴm����^���J��ŲY��ﷃ����/�
��I]?7 �m�8/�,m�=^�Dy<S�5�.<��yMhVK�e#���3����j��ˡR�rKc��7�b�Ӄ�hc�ke���� � [�Y���Q:��N��8p�����˼!@	��9�������� �HV>,� W�p�:������\/`���
�7&=<�u�IThe�h:9�zhZ���������f�w�S���P�)��m�<�T�����b�xn&W�b����o[��'�W�;a+Ց ��� �-��z^��r>�_�� L%�(�Ux8��C�x|ӷʦdx||~����3���έ*�d���^�.vJJֆ
ѪhX���rJk��>�:lǲ���Ѳđ�,N��!҅3��P��ϧw�|7N9a�X��5�xM�������P���U1mv :�-����t�|9y�n>�}����`�K �����~�/�Q80JY|9?���u��+Zm\26��X�A,�hI�MX�p��T_n��%�|mW�韷�K���D���u�կ�c�oYG��p;�rbxu}J�-��@��g�K�K�cvG_�&|���ُ�������
�d�z�p�&��h�4\���U�y�����_��V�ܩ�9ɻ�PL� hCp�Y��O/G��m]%j�����k�F#5#�	:�}e0����"�ĳ���Bi��
b��Y���Ɂ�o'`:�����b�s_H�M��x��
��Ш���r�b�:9v��v�B��@��cVUv��Qh��H�L�]�����@�[)�9^��kH� '�%V�T�J,�RU:�����wvXxR��{��e�e�����	���e�k�o7�볏�������
�x�q{�����53��꜏���\��9����զj)r5o�<�J?��D���������H�v�M�id�^��ŗy�tB���&`�޾W���a:�fu�%^1�)�S�����l	�.����KUU�r�G|{�B5�x����T�)#̬�֝+�r9����v�Ui�#+ߦ5h���RR=��U\���纳�\��6�U��6ů�V-�P\T"�Ӆ����K�����S�w�����"��{�g{��e ��c�Jϣ�B�R�k�/5�����I1��T���W�N2m�Y֪I�D���YU��9�S��S����2��b*;���b������j�- ^�;��`�,�@��4��ќ1�[`�����L�&�}V��\u�+���/	��K��ju���v�\j3ꠀ������=MV�~W[����h��Ot����AE�����Y��M"߳fI���sL��e�-ץ~y}�)��1K���7�&�֙QZ-��ʪ�?�DmC�N� �)j�˭[+��R�V��Ȉڿ�D�w���»(�l?,�n�]PQeq�O_/2�an_��~�y��w�r-�`Jk8$qG��\����Pd�w��ʰf������ G��Å��K��:<P�ⵟ��͐�>�غ��v9; J��G�	�1"O1�,�)�elF���$]-�Ti�+-T�D����m �a�l�m1[����7���h�_��#�S@o���Z��n�g ���N1�V�!r�걭� �]�E��x�T/����BH)���w�st绽�9gH#�_��𔊠p���̛���{���f)
� Eg���t�-�mx^Qx^7�;��,ߛ'�@��J�F��.}a*�y篡a�{��p��T$���)�:dL�	��K��ͮ�V�`�T���ex�Cl���/2�x��x��i��5p�$7qXA�{� Dk�Ή��1�Eh{1hզ3*��7H��f��#�M�:?�s�D�(t:��Z�s~_'���� �݌tz.,(��>G�w���X)S�����LJHV�%VL����\'�e˝�͑!N��<V�5Ohl�@sI�Z&�ʽ� x&�C�rTj%�GSa����V���R�W *����V����X�H˼�О�#��q��2o�U�%��������z�%���
��RjNV��\�n�@MK��^6�3t
e%�}DUS�.�:��('-��RQ��y���n�:�FX���Վ��m�-@��P���iƏ������/�(0"�^6�*̐����Fr+|�d���>�2>7l��m�s�V�AT��xe�6'��VR9�q���q�9�NXnT/��L�K_+=���nbCDL��x��	�bS{Bo�aL�D�"�8��*�ԇ*%e��t�W�up�y\-7���-��
���gW�hK�{Xb����Y� Ty��}D�����~ptO��^�<T5\̬QH#@�a��6\ 1|4�e\��=���{�Z=�%'����� �=���K��eꨒb�"eS�)�A�.nByҴ���+d� ��׾V
�۟&�DS���/���fo��Ã/�C�׿�B��S`Q%:�G�� l������# SDa<F��2UI���NkN�1�(8+tyO�X	�o1��}[9�v2���Xe3�S Qm8H��!��ݽ+���1�����. 'Q
�h��6�'����T�q!l�|݀4���Q� 7��j�cn�D�d�Mj�����<À��C:�th-�mծ�7?���(@��^��f�y�'Iu�<��������p���u׭� �����YL��T�a@DS���L~[SU��+�+�3���.(I�pB��y�ش��B�q�r;7уT��ǪY��f=�2\���n�}�VXK������D��XJ�������Ϊ, �&���* L���a$T����`A�GԀ��E7�����^��u�jW}�A�������x6�k�Q\�g�n�B��`�	iZ��>-��d�
���m�c'l�U� ֺ����8��W��9�e�c`U|'�@�*����j�1\�Ae�',�nI��}�|�*��:��"����Z;��2t&R����7/�������џ64`F�u����Y�
�	`�2L��5uM�R��{���(��^l��l\W�����؋�3ʱ��1���t��TS�P �6�������']�־�t��:���f�ޟ�X���(��kr-.��y�6��#}4}]��Wl;C��^�--�
Mn��+�4 �8���#�q{��J����D׏��D�x�3oC�V�,����B�t�:̓є�	QFA뾙��A�4�TׁڎB����bŻf��g�\>�Z0I;G��:.��i��D#����^�%s�Id0�`��V�;ڒ��M�!���l��+����8��㈺v� �uN�}*TK%3����Y�;�[B-ތ�fټ֓����zD��h���l���
��H���8#z�<��b}Q�ٯ��sR�;L�[��f��R�jj����+��`����y�x+N}?��ڥ���P/G�ݒeU�����R�x�Ԯ+�5X�Ԗ��0�E)g� ��_O.�������,��+l��)�*����R���K/C�x�|��~yy��`^���R�M���v�Ɲ����(a+RD�;NCRjkL~�^{��J]��
�ōyIN4����SiC�����6�U,�d�Ԭ����� �p��&	�ͦ*U�rY�����}����o���d�WC�W��r��X{�UWU|�	Y�I���}���Gr�U�Ew�vݠF�t�9<��yCWLu�GlRڴ*@�뤉YX���[& ��d�?�K��/|)8�����Ӈӕ��}�}�y�W�q�"��p8�>j��G�\�G��oZ;G_w��!9��c@�l��k:�C����f�    Λa*�P.�$�9q�\%���ss�I3�gz|���b��!M�Ri����%n'��g�4�3�W�zy�����o}5�m�������AH!�.�<Pn��
�6�J������0W��-
��+{xY��+?^R��̅��lgK�uT�*C���@����AJ��3~�o)�&N,�i�\�a�Y+��#��:�FT&�#u��Sͪih�M|����&���d�
�Oc��Ĺ}�%���=�ɨ�͕�D�\�N�Y��4:[�gll.h	!T(�G��F�������O��d�E�ޯ��w��J۹a�X���?Rw<�m�h�	dp�A��B�,��'4X�r���~�d�d�%U��n�Wɺ�|w���89��Bޛ�C��-i���3l�Qoe��s��VHV��r�����Lqk��:���k�H����ՙ���h����j����[b�ҞQr�������cV��1'��&f�B�ȯL��J�w��{˾�����.)|wK��`j��`�!��6�p�tT�Q�S�D��!���Ҿ_s���Cj�[^K
�F��2����E�B��U�5��
�F�b�т�M�Ӳ�$E�3n��f`�^�cw�f8�!)N����{��UvL$5T�K'�V#�`>T0�#r� ��i}n�$��M�9d9��ӓ��ӏ�g�sb��6��ۘ���"�h�Q����U>����i�t�Z�bĄ��e��V}�I�ϧy`����D�ӂ�e�p*CeG��<֨�?�G��lC��2��p�˻*PW�e�-�>��{[�7l���s�wК��fEv�KQ;��R)���kח����Y5��0v`��U����*ղ&�)/��7d �nئL⍋�s�P�#�٥K��^��_��H_���R�o8��㪙 ��+�Ǘ���Kw�/1r=�.J��3��k?(UH�!�Z��?�)�m�?(Q�=HE&L�rL��ܧ4�53'֏��6�R޾���l7~GF�E2�߾�'���6jD����	��S�eV�DVT>OX2�5���XԠ�0�i�P�B��R�q  h�d�(���k�1��Y&�>Kz��
��)l���$�V�j�.6��[3	b� bA
	��ܰ��U8Z)�e�lܠX�ȍ`��w�iE�ӱ�Ud%�B�!��6f�D���5~�S�	��w	�\�F&%)��z��ڵ嗌��*CI�0�N�]�䤼Y4���8�W�w����E�jRv�c�O��O�<,&7���k�D�J�P���N�g��4�H�`����"]Փ+��__�}c[���S��>§�C	��LJS��N�L��h.�mϽ� H�[xr1y�j�:OVa⅊f���&�D1UN�����y,Ssӱ@�r��b���P^lvv3l`܆�·���/'\��|'\َRQ	��6�2F�3Z�H����$ϝ�/y�/�k�(�`b%G0Ӥ��,�ه���bs�"Q�߳�d��n�^���T m8�v������5�7�$�;Q	�����h$F�=a���rG�
������=6��'����~�R����紫������Y�w����R��g��z�z��ײ��OA+�Oe�n�:5��CX �jG;�EU�u��h���Ӹl���i2��T�d4W2oح��<�58I_!��^����Cu4���� ���JPm�*<G����d����{�y40�R�x<9F�L�u�\T2�/,��cJ�@��j�lY
�t� ��_�.v���.�R�����1�����غAH�~�\Oe��d�h)�	W]��6�2ey�N:r@[��s�ʝ�t%&a��)�w����������;��KX��Rݴ�2�������UG03.mo$�əp�aA��El/�,��E����������.:b*oY��^{X�g�sg>U#("���p?X�G3��yMU:�vj3�h��[�m��ox�M�a:�U� ?'̪�|�e#��d$OВ+����R�;�G����"F�I�#M���	�}뚈ߑ�[I3�Pv��/�����(�XJ����49Td�������?;�8!���ә2���Yۨ����Y�K����%���5��h#��*(�))�N����JΕ>P։p��J��,��ڰ��_|RygT�=�##]���Nzo�"D��hZFlK��A���e��X*p<���7�2�y���3�� *��S̕5dr[�l�³Z,��.O'w��;�O�xƘ�J^����ʏ�Zgti|;%,�2{��e�nw#�jN�N4ӽQ������A��	bz������س��G�w��>V-}]{���p�ʼ+�F�s��$P�N}���~R��%�����Y����z�k���k�90mz��%���L@ݾ��Kmb�8��/wGw�n�[e�i���N�&������	�S͆[���UŇE�ԍr�����������M9�n�
lߕʯ^���ʍ��Hk��1kT�l�@�;�>�x�H&: f�Q��'���na�h;X��x�1h�<�V�D�lԲҺ�o������C ���s[�p}rI������J �k;z�	��ז>@\���8�/����;el�2�EX!��H���r�M]�˳��T��*�":�^�c��(N�볓τ��4�x��V1�꠿�W޶���3DI��� �*�����UO�7��lQH�m[�HO���dw/.ȣI< �#��.N^��4�f����UF�z��Q'>���V��`�x���sn�� �:�'X �Z� �cb���j�,.p����e�L�I-�H�m�_���G�����a��k <����F�Ye(��<������	*�ɵ�@���p�����tU�휻'����܀5��%��|Ɯܧ�y^�.r��]�'�|�����/>/�"��~$Y�������?�y3Ae�i�G(��]��M.���pE;��%<�.����b!�����f>aD����Zr?��.ev�>JQ%����MPU\��������O�J�������`/=�C��	6����>,P2AXJۢ���%=ܙ+q�*|lCM�q���B�	{��9c�F4��=����9o-���jY\��4;s�x�ZV��LWuF~��qY�6,[\�k��%����2A����/��ne�zd�&Z�u��C�
���]�׈>Q#�Ȳ�l�Կ�����Am���{��R��G�5�S�SJ^�t��m�܋dP�6Ėv�z��_�N>F�á�@�8�v�"O�
"��a���mi�Na��)�	V�\��v}����Gpz?��BoP
�������^��9ݦi�/�Ħ�}����dru���+�q�H+C���~]?��p"���Ej}�+�V#�\�ݔ=>߂���+��	�%:.�E&��na'�j�@,��з� �������'�_��@��W֬F�u.NU���o/o.N&�O�n�>^&8�� m���Z����ne����0j���b�*����S+�����[��x����:�xCcF�x�H�H�3�^�<5/��r6[-@U�~��x���� nx%�^��O_NÛ�N�7u�7� ���GS�A)4;��.^[�-��ި�W���2I*J��竩�����=��zr��h���7�v1ьX4��7�#+��g���}\M��m�{� �_�F�[��xf<Sc��վ�@{\�EH�����nne����Mѥ�L�jU������'p��j���>�>��Yp��\C|�%<���ߎтsÄ��|O(N����_{X6���5�
�;�Q?��D�3�b��]�L�/,�e�ݛ�ہD�m�m7�芁����㪾��h�(l6�Ւh��#�v�hN1Z�N�+|��w�|r�\�Bp%t�Ó`Z��}�Čo����d�U���9N�2�%�!|Ƈ%ۥ��Ӳ��@M�~F:2�	�ŷ&9���Q���6��%H^�@�8l�@��N�	�ܓ���tFIt�Og�e�el-�Z!�R�vVc塳���[��M�xU��+Nܰ�B�0�Z��,��AҩJ��v�����xt�-=������F�%���g �   ji�ԸX�K�ÍX��Ӈ&+��l�~������v�Y��K����9խ6���Kq��/�`L�J�����(���Z�E'�3�1U�-:�sϻq�B��A�R8ֱj��P�0��{��q���I^�Z$�m �b�����''�g��U�:�ȴƏ�PD�v�	��?�_~������     