import JSEncrypt from 'jsencrypt';

// PUBLIC KEY for RSA encryption
const PUBLIC_KEY =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8I04B6voEYbDr+tnT91prCsdFYxv7bdSRteACfr5Iam8EJXEpQIU6uAsE1uA/Gv1+CjH5olDDXP1P2wnQpXJ8R7Ktw5eCWt3TRfCIfW+EnacnsFlt7t0N8dHJWljE6bhgULbulpsS9QqX6ufjuCah4LzavHYF2Do6q/1eQXKU7lyuuTV7BgXe05jRlOLvKAf4/s/oX9QJ60rQ1cpVd0xM0O9ZpzAZN9gGf/qD/7tXWbSHhLI+HXpGkCuoWDgNAMi+EtrOc2754MF7UuNDHO8fSYfiDmojCx0x4/b1fgS/iGgzDFGDfYYgHxm9rdcjOCTqImASyem18FY/1cDYhjjcQIDAQAB';

const CLIENT_ID="6LeI-IocAAAAAD3Lq7r3ZN0eTqEgWmLXuw2y2kax";
const CLIENT_SECRET="6LeI-IocAAAAAIecfAB0PGZpKcdLAaq7vG4244lK";


function encryptMessage(message, publicKey) {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  return jsEncrypt.encrypt(message);
}

export const encryption = (value) => {
  const stringValue = value?.toString();
  const encryptedValue = encryptMessage(stringValue, PUBLIC_KEY);
  return encryptedValue;
};

// Base 64 encoding with RSA encryption
export const base64Encrypt = (id,userAction) => {
  console.log('id\n\n,userAction',id,userAction);
  const obj={
    clientId:CLIENT_ID,
    clientSecert:CLIENT_SECRET,
    captchaId:id,
    userAction:userAction
  };

  const stringValue = JSON.stringify(obj);
  const result = encryption(stringValue);
  const encodedResult=btoa(result);
  return  encodedResult;
};

export const bae64Decode=(value)=>{
  const stringValue=value?.toString();
  const decodedText = atob(stringValue);
  return decodedText;
}
