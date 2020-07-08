import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

const { Header } = Layout;

import {
    PlusOutlined,
} from '@ant-design/icons'

export default function Nav () {

    const { t, lang} = useTranslation();

    return (
        <Header>
            <div className="logo">
            </div>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item icon={<PlusOutlined/>}>
                    <Link href="/add" lang={lang}>
                        <a data-testid="to-add">
                            {t('home:add')}
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                <Link href="/" lang={lang === 'en' ? 'ru' : 'en'}>
                    <a>
                        {lang !== 'en' ? 'EN' : 'RU'}
                    </a>
                </Link>
                </Menu.Item>
            </Menu>
        </Header>
    )
};
