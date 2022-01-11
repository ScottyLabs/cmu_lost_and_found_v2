const emailbody = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="x-apple-disable-message-reformatting" />
		<title>ScottyLabs</title>
		<style type="text/css">
			/* ----- Custom Font Import ----- */
			@import url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext);

			/* ----- Text Styles ----- */
			table{
				font-family: 'Lato', Arial, sans-serif;
				-webkit-font-smoothing: antialiased;
				-moz-font-smoothing: antialiased;
				font-smoothing: antialiased;
			}

			a {
				text-decoration: none;
			}

			/* ----- Plane styles ----- */

			.plane-preamble ul {
				padding-left: 1.11em;
				list-style-type: square;
			}

			.plane-preamble li {
				padding-bottom: 0.25em;
			}

			@media only screen and (max-width: 700px){
				/* ----- Base styles ----- */
				.full-width-container{
					padding: 0 0 0 0 !important;
				}

				.container{
					width: 100% !important;
				}

				/* ----- Header ----- */
				.header td{
					padding: 30px 15px 30px 15px !important;
				}

				/* ----- Hero subheader ----- */
				.hero-subheader__title{
					padding: 80px 15px 15px 15px !important;
					font-size: 35px !important;
				}

				.hero-subheader__content{
					padding: 0 15px 0 15px !important;
				}

				/* ----- Title block ----- */
				.title-block{
					padding: 0 15px 0 15px;
				}

				/* ----- Paragraph block ----- */
				.paragraph-block__content{
					padding: 25px 15px 18px 15px !important;
				}

				/* ----- Info bullets ----- */
				.info-bullets{
					display: block !important;
				}

				.info-bullets tr{
					display: block !important;
				}

				.info-bullets td{
					display: block !important;
				}

				.info-bullets tbody{
					display: block;
				}

				.info-bullets__icon{
					text-align: center;
					padding: 0 0 15px 0 !important;
				}

				.info-bullets__content{
					text-align: center;
				}

				.info-bullets__block{
					padding: 25px !important;
				}
			}

			.full-width-container{
				padding: 30px 0 30px 0;
			}
		</style>

		<!--[if gte mso 9]><xml>
			<o:OfficeDocumentSettings>
				<o:AllowPNG/>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml><![endif]-->
	</head>

	<body style="padding: 0; margin: 0; min-width: 100%;" bgcolor="#eeeeee">

		<!-- / Full width container -->
		<table class="full-width-container" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#eeeeee" style="width: 100%; height: 100%;">
			<tr>
				<td align="center" valign="top">
					<!-- / 700px container -->
					<table class="container" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="width: 700px; padding-bottom: 60px;">
						<tr>
							<td align="center" valign="top">

                                <!-- / Header -->
<table class="container header" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">
    <tr>
        <td style="padding: 30px 0 30px 0; border-bottom: solid 1px #eeeeee;" align="left">
                <img width="40em" src="https://i.imgur.com/IS5n5x3.png" alt="Logo" style="vertical-align: middle;">	
                <!-- <span style="margin: 0 0 0 5px; vertical-align: middle; font-weight: 700;" class="suffix"></span> -->
            </a>
        </td>
    </tr>
</table>
<!-- /// Header -->

<!-- / Hero subheader -->
<table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">
    <tr>
        <td class="hero-subheader__title" style="font-size: 28px; font-weight: bold; padding: 60px 0 15px 0;" align="left">{subheader_title}</td>
    </tr>

    <tr>
        <td class="plane-preamble hero-subheader__content" style="font-size: 18px; line-height: 32px; color: #666666;" align="left">{subheader_content}</td>
    </tr>
</table>
<!-- /// Hero subheader -->

<!-- / Hero footer -->
<table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">
    <tr>
        <td class="hero-subheader__content" style="font-size: 18px; line-height: 32px; color: #666666; padding-top: 0px;" align="left">
            <p style="margin-top:24px">Thank you,</p>
            <p>ScottyLabs Lost and Found</p>
        </td>
    </tr>
</table>
<!-- /// Hero subheader -->
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
`;

export default emailbody;
