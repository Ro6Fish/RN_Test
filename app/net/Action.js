import React from 'react'

const Action = {

    SIGN_IN: {method: 'POST', url: '/merchant_api/sign_in'},
    SIGN_OUT: {method: 'POST', url: '/merchant_api/sign_out'},
    ORDER_DETAIL: {method: 'POST', url: '/merchant_api/backOrderController/orderInfo'},
};

export default Action;