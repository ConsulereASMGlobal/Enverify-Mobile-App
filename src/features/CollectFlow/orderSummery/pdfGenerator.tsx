import { Alert, Platform } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { epochToHumanReadable } from "../../../utils/dateUtils";
import { totalPrice, truncateToTwoDecimalPlaces } from "../../../utils/getSum";
import Share from "react-native-share";
import store from "@src/redux/store";
import ReactNativeBlobUtil from "react-native-blob-util";
import { routes } from "@src/navigation/routes";
import { IMAGEBASEURL } from "@src/config/baseURL";

export const pdfGenerator = async (
  navigation: any,
  dQr: any,
  recieptData: any,
  customerName: any,
  customerMobile: any,
  signUrl: any
) => {
  const state = store.getState();
  const franchiseeId = state.franchisee.franchiseeId;
  const franchiseeName = state.franchisee.franchiseeName;

  const remark = recieptData?.orderDetails[0]?.items[0].remark;

  const certifiedWt = totalPrice(recieptData?.orderDetails[0].items);

  const baseUrl = IMAGEBASEURL;

  try {
    const html = `
    <html lang="en" data-bs-theme="light">
  <head style="box-sizing: border-box">
    <style>
      body {
        margin: 0 auto !important;
        max-width: 640px;
      }
    </style>

    <script src="/static/js/bundle.js" style="box-sizing: border-box"></script>
  </head>

  <body>
    <div class="modal-content" style="box-sizing: border-box">
      <div
        style="
          padding: 20px;
          width: 100%;
          border: 2px solid black;
          background-repeat: no-repeat;
          background-image: url('${baseUrl}/media/misc/top-left.svg'),
            url('${baseUrl}/media/misc/bottom-right.svg');
          background-position: left top, right bottom;
          background-size: auto, auto;
          box-sizing: border-box;
        "
      >
        <div
          id="pdf-content"
          class="container"
          style="
            position: relative;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 20%;
            box-sizing: border-box;
            --bs-gutter-x: 1.5rem;
            --bs-gutter-y: 0;
            width: 100%;
            padding-right: calc(var(--bs-gutter-x) * 0.5);
            padding-left: calc(var(--bs-gutter-x) * 0.5);
            margin-right: auto;
            margin-left: auto;
          "
        >
          <!-- This is for header -->
          <div
            class="row"
            style="
              box-sizing: border-box;
              --bs-gutter-x: 1.5rem;
              --bs-gutter-y: 0;
              display: flex;
              flex-wrap: wrap;
              margin-top: calc(-1 * var(--bs-gutter-y));
              margin-right: calc(-0.5 * var(--bs-gutter-x));
              margin-left: calc(-0.5 * var(--bs-gutter-x));
            "
          >
            <div
              class="col-9"
              style="
                padding: 2rem 3.25rem;
                font-family: 'GT Walsheim Pro';
                box-sizing: border-box;
                flex-shrink: 0;
                width: 75%;
                max-width: 100%;
                margin-top: var(--bs-gutter-y);
                flex: 0 0 auto;
              "
            >
              <div style="box-sizing: border-box">
                Member :
                <span class="fw-bolder text-dark" style="box-sizing: border-box"
                  >${franchiseeName ?? "n/a"}</span
                >
              </div>
              <div style="box-sizing: border-box">
                ID :
                <span class="fw-bolder text-dark" style="box-sizing: border-box"
                  >${franchiseeId ?? "n/a"}</span
                >
              </div>
            </div>
            <div
              class="col-3"
              style="
                margin-top: -20px;
                box-sizing: border-box;
                flex-shrink: 0;
                width: 25%;
                max-width: 100%;
                padding-right: calc(var(--bs-gutter-x) * 0.5);
                padding-left: calc(var(--bs-gutter-x) * 0.5);
                flex: 0 0 auto;
                position: absolute;
                right: 30px;
              "
            >
              <img
                width="180"
                height="100"
                src="${baseUrl}/media/logos/certificate.png"
                alt="main-logo"
                style="
                  background-color: rgb(255, 255, 255);
                  box-sizing: border-box;
                  vertical-align: middle;
                "
              />
            </div>
          </div>
          <!-- Cursive logo -->
          <div
            style="
              color: rgb(28, 67, 121);
              font-size: 36px;
              font-style: italic;
              font-weight: bold;
              font-family: 'Monotype Corsiva', cursive;
              line-height: 42px;
              box-sizing: border-box;
              text-align: center;
            "
          >
            Collection Receipt
          </div>

          <br style="box-sizing: border-box" />
          <!-- Depositor Details -->
          <table width="100%">
            <tr>
              <td
                colspan="4"
                style="font-size: 16px; font-weight: bold; padding-bottom: 10px"
              >
                Depositor Details
              </td>
            </tr>
            <tr>
              <td>
                <table>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Depositor Name
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">${customerName ?? "n/a"}</td>
                  </tr>

                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Mobile Number
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${customerMobile ?? "n/a"}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Source
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${recieptData?.source ?? "n/a"}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Collection Date
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${epochToHumanReadable(recieptData?.createdAt) ?? "n/a"}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Status
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${recieptData?.status ?? "n/a"}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Geo-Coordinates
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td colspan="2" style="text-align: left">
                      ${recieptData?.latitude ?? "n/a"},
                      ${recieptData?.longitude ?? "n/a"}
                    </td>
                  </tr>
                </table>
              </td>
             <!-- <td rowspan="5" style="text-align: right">
                <img
                  src="${dQr}"
                  alt="QR Code"
                  style="width: 100px; height: auto"
                />
              </td> -->
            </tr>
          </table>
          <br />
          <!-- Table -->

          <table align="center" style="width: 100%; box-sizing: border-box">
            <tbody>
              <tr>
                <td
                  colspan="4"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    padding-bottom: 4px;
                  "
                >
                  Material Details
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    width="100%"
                    border="1"
                    cellspacing="0"
                    cellpadding="5"
                    style="
                      border-collapse: collapse;
                      width: 100%;
                      max-width: 600px;
                      font-family: Arial, sans-serif;
                      color: #333;
                    "
                  >
                    <tr style="background-color: #003366; color: #ffffff">
                      <th style="text-align: center">S.N.</th>
                      <th style="text-align: center">Batch ID</th>
                      <th style="text-align: center">Category</th>
                      <th style="text-align: center">Type</th>
                      <th style="text-align: center">Quantity</th>
                      <!-- <th style="text-align: left">Source</th> -->
                    </tr>
                    ${recieptData?.orderDetails
                      ?.map((item) =>
                        item?.items
                          ?.map(
                            (ite, key) => `
                    <tr>
                      <td style="text-align: center">${key + 1}</td>
                      <td style="text-align: center">${recieptData?.id}</td>
                      <td style="text-align: center">
                        ${item?.categoryName ?? "n/a"}
                      </td>
                      <td style="text-align: center">
                        ${ite?.itemName ?? "n/a"}
                      </td>
                      <td style="text-align: center">
                        ${
                          ite?.quantity
                            ? truncateToTwoDecimalPlaces(ite?.quantity)
                            : "n/a"
                        } Kg
                      </td>
                      <!-- <td>${ite?.remark ?? "n/a"}</td> -->
                    </tr>
                    `
                          )
                          .join("")
                      )
                      .join("")}
                  </table>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  style="font-size: 16px; font-weight: bold; text-align: right"
                >
                  Certified Weight : ${certifiedWt} Kgs
                </td>
              </tr>
              <tr>
                <td
                  style="font-size: 16px; font-weight: bold; text-align: right"
                >
                  Waste Type : ${remark}
                </td>
              </tr>
            </tfoot>
          </table>

          <br />

          <table width="100%">
            <tr>
              <td
                colspan="4"
                style="font-size: 16px; font-weight: bold; padding-bottom: 10px"
              >
                Facility Information
              </td>
            </tr>
            <tr>
              <td>
                <table>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Business Name
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${recieptData?.centerName}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Address
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${recieptData?.centreInfo?.address?.street || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding-right: 10px">
                      Country
                    </td>
                    <td style="text-align: left; padding: 0 5px">:</td>
                    <td style="text-align: left">
                      ${recieptData?.centreInfo?.address?.country || "N/A"}
                    </td>
                  </tr>
                  <!-- <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Signature
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          width="60"
                          height="60"
                          alt="images"
                          src="${signUrl?.uri}"
                          style="
                            box-sizing: border-box;
                            vertical-align: middle;
                          " />
                      </td>
                    </tr> -->
                </table>
              </td>
              <td rowspan="5" style="text-align: right">
                <img
                  src="${recieptData?.images[0]}"
                  alt="Image"
                  style="width: 100px; height: auto"
                />
              </td>
            </tr>
          </table>

          <br />

          <table
            align="center"
            style="
              max-width: 640px;
              width: 100%;
              padding: 20px;
              box-sizing: border-box;
              padding: 12px;
              background-color: #f8f8f4;
            "
          >
            <tr>
              <td>
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="max-width: 600px; width: 100%"
                >
                  <tr>
                    <td style="padding-bottom: 10px">
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <!-- Each table row contains three cells: Label, Colon, and Details -->
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Company Name
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>Evergreen Labs Philippines Consulting Inc</td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Regd Address
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>
                            6th Floor, One Ayala Avenue, Tower 2, Ayala Avenue,
                            Ayala Center, San Lorenzo, City of Makati, Fourth
                            District, National Capital Region (NCR),
                            Philippines, 1223
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Email
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>erica@evergreenlabs.com</td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Website
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>www.extendedresources.network</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-size: 12px;
                        padding-top: 10px;
                        border-top: 1px solid #ccc;
                        text-align: center;
                      "
                    >
                      This is not a tax invoice.<br />
                      This is computer generated document, no signature is
                      required. The material type information is as per RA 11898
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <table width="100%">
            <tr style="text-align: center">
              <td>
                <img
                  width="100"
                  height="25"
                  src="${baseUrl}/media/svg/dashboard/asm-final-2.png"
                  alt="image"
                  style="box-sizing: border-box; vertical-align: middle"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>

    `;

    if (Platform.OS === "android") {
      const options = {
        html,
        fileName: `invoice`,
        directory: "Download",
        base64: true,
      };
      const file = await RNHTMLtoPDF.convert(options);
      let filePath =
        ReactNativeBlobUtil.fs.dirs.LegacyDownloadDir +
        `/Extended_Resources/Invoice_collect_${recieptData?.id}.pdf`;
      let dirs = ReactNativeBlobUtil.fs.dirs;
      console.log(dirs.LegacyDownloadDir);
      ReactNativeBlobUtil.fs
        .writeFile(filePath, file.base64, "base64")
        .then((response) => {
          Alert.alert(
            "Success",
            `Receipt saved to Downloads/Extended_Resources`,
            [
              {
                text: "Ok",
                // onPress: () => navigation.navigate(routes.bottomTabs.home),
                onPress: () => {},
              },
            ]
          );
        })
        .catch((errors) => {
          console.log(" Error Log: ", errors);
        });
    }

    if (Platform.OS === "ios") {
      try {
        const options = {
          html,
          fileName: `Invoice_collect_${recieptData?.id}`,
          directory: "Documents",
          base64: true,
        };

        const pdfFile = await RNHTMLtoPDF.convert(options);
        const shareOptions = {
          url: `${pdfFile.filePath}`,
          type: "application/pdf",
          failOnCancel: false,
        };

        await Share.open(shareOptions);
        console.log("PDF file saved to:", pdfFile.filePath);
      } catch (error) {
        console.error("Error converting HTML to PDF:", error);
      }
    }
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};
