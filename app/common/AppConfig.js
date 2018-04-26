import React from 'react'

const AppUrl = {

    DEV: 'http://stdev.hlvan.cn',
    TEST: 'http://sttest.hlvan.cn',
    RELEASE: 'http://st.hlvan.cn',
}

class AppConfig {

    getUrlPrefix() {

        return AppUrl.TEST;
    }
}

export default AppConfig;