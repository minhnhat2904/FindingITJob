export const passwordResetTemplate = (code) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <style type="text/css">
            body,
            p,
            div {
                font-family: arial;
                font-size: 14px;
            }
    
            body {
                color: #000000;
            }
    
            body a {
                color: #1188e6;
                text-decoration: none;
            }
    
            p {
                margin: 0;
                padding: 0;
            }
    
            table.wrapper {
                width: 100% !important;
                table-layout: fixed;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            img.max-width {
                max-width: 100% !important;
            }
    
            .column.of-2 {
                width: 50%;
            }
    
            .column.of-3 {
                width: 33.333%;
            }
    
            .column.of-4 {
                width: 25%;
            }
            
    
            .code {
                width: 100px;
                height: 50px;
                background-color: rgb(194, 194, 194);
                text-align: center;
                line-height: 50px;
                margin: 0 auto;
            }
    
            @media screen and (max-width: 480px) {
    
                .preheader .rightColumnContent,
                .footer .rightColumnContent {
                    text-align: left !important;
                }
    
                .preheader .rightColumnContent div,
                .preheader .rightColumnContent span,
                .footer .rightColumnContent div,
                .footer .rightColumnContent span {
                    text-align: left !important;
                }
    
                .preheader .rightColumnContent,
                .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                }
    
                table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                }
    
                img.max-width {
                    height: auto !important;
                    max-width: 480px !important;
                }
    
                a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
    
                .columns {
                    width: 100% !important;
                }
    
                .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }
            }
        </style>
    </head>
    
    <body>
        <center class="wrapper" data-link-color="#1188E6"
            data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
            <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                    <tr>
                        <td valign="top" bgcolor="#ffffff" width="100%">
                            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0"
                                cellspacing="0" border="0">
                                <tr>
                                    <td width="100%">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td>
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                                        style="width: 100%; max-width: 600px" align="center">
                                                        <tr>
                                                            <td role="modules-container" style="
                                                                        padding: 0px 0px 0px 0px;
                                                                        color: #000000;
                                                                        text-align: left;
                                                                    " bgcolor="#ffffff" width="100%" align="left">
                                                                <table class="module preheader preheader-hide" role="module"
                                                                    data-type="preheader" border="0" cellpadding="0"
                                                                    cellspacing="0" width="100%" style="
                                                                            display: none !important;
                                                                            mso-hide: all;
                                                                            visibility: hidden;
                                                                            opacity: 0;
                                                                            color: transparent;
                                                                            height: 0;
                                                                            width: 0;
                                                                        ">
                                                                    <tr>
                                                                        <td role="module-content">
                                                                            <p></p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="module" role="module" data-type="text"
                                                                    border="0" cellpadding="0" cellspacing="0" width="100%"
                                                                    style="table-layout: fixed">
                                                                    <tr>
                                                                        <td style="
                                                                                    padding: 18px 10px 18px 10px;
                                                                                    line-height: 22px;
                                                                                    text-align: inherit;
                                                                                " height="100%" valign="top" bgcolor="">
                                                                            <div>
                                                                                You are receiving this email because you (or
                                                                                someone else) have requested the reset of
                                                                                the password for your account.
                                                                            </div>
                                                                            <div>&nbsp;</div>
                                                                            <div>
                                                                                We cannot simply send you your old password.
                                                                                A unique link to reset your password has
                                                                                been generated for you. To reset your
                                                                                password, copy the code below.
                                                                            </div>
                                                                            <div>&nbsp;</div>
                                                                            <div style="text-align: center" class="code">
                                                                                ${code}
                                                                            </div>
                                                                    </tr>
                                                                </table>
    
            </div>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </div>
        </center>
    </body>
    
    </html>`;
};
