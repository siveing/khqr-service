const { khqrData } = require("bakong-khqr");
import { BakongKHQR, MerchantInfo, IndividualInfo } from "bakong-khqr";

export class KHQRService {
  constructor() {
    console.log("khqrData.currency.khr", khqrData.currency.khr);
    console.log("khqrData.currency.usd", khqrData.currency.usd);
  }

  generateMerchantQR(body: any) {
    console.log("[GENERATE MERCHANT] body", body);

    const { ccy, amount } = body

    const merchantInfo: MerchantInfo & any = {
      merchantID: 'siveing',
      bakongAccountID: 'siveing@aclb',
      merchantName: 'siveing',
      merchantCity: 'Kampong Thom',
      acquiringBank: 'Kampong Thom',
      currency: Number(ccy) || khqrData.currency.khr,
      amount: Number(amount) || 100000,
      billNumber: '#0001',
      mobileNumber: '85517597419',
      expirationTimestamp: Date.now() + (30 * 60 * 1000), // 30 minute
    }
    const khqr = new BakongKHQR();
    const response = khqr.generateMerchant(merchantInfo);

    console.log("[GENERATE MERCHANT] response", response);
    return response;
  }

  generateIndividualQr(body: any) {
    console.log("[GENERATE INDIVIDUAL] body", body);
    const { ccy, amount } = body

    const individualInfo: IndividualInfo & any = {
      bakongAccountID: 'siveing@aclb',
      merchantName: 'siveing',
      acquiringBank: 'Kampong Thom',
      currency: Number(ccy) || khqrData.currency.khr,
      amount: Number(amount) || 100000,
      mobileNumber: '85517597419',
      expirationTimestamp: Date.now() + (30 * 60 * 1000),
    }

    try {
      const khqr = new BakongKHQR();
      const response = khqr.generateIndividual(individualInfo);

      console.log("[GENERATE INDIVIDUAL] response", response);
      return response
    } catch (error) {
      console.error('[GENERATE INDIVIDUAL] error', error);
    }
  }

  decodeKHQR(qr: string) {
    if (!qr) {
      return {
        message: "Qr String is required"
      }
    }
    try {
      const decodeResult = BakongKHQR.decode(qr);
      console.log("[DECODE KHQR] result", decodeResult);
      return decodeResult
    } catch (error) {
      console.error('[DECODE KHQR] error', error);
    }
  }
}