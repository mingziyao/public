from Crypto.Cipher import AES
import base64
import requests
import json



second_param = "010001"
third_param = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7"
forth_param = "0CoJUm6Qyw8W8jud"

def get_params(page):
     iv = b"0102030405060708"
     first_key = forth_param
     second_key = 16 * 'F'
     if(page == 1):
         first_param = '{rid:"", offset:"0", total:"true", limit:"20", csrf_token:""}'
         h_encText = AES_encrypt(first_param, first_key, iv)
         h_encText = AES_encrypt(h_encText, second_key, iv)
         return h_encText
     else:
         offset = str((page-1)*20)
         first_param = '{rid:"", offset:"%s", total:"false", limit:"20", csrf_token:""}' % offset
         h_encText = AES_encrypt(first_param, first_key, iv)
         h_encText = AES_encrypt(h_encText, second_key, iv)
         return h_encText

def get_encSecKey():
    encSecKey = "257348aecb5e556c066de214e531faadd1c55d814f9be95fd06d6bff9f4c7a41f831f6394d5a3fd2e3881736d94a02ca919d952872e7d0a50ebfa1769a7a62d512f5f1ca21aec60bc3819a9c3ffca5eca9a0dba6d6f7249b06f5965ecfff3695b54e1c28f3f624750ed39e7de08fc8493242e26dbc4484a01c76f739e135637c"
    return encSecKey

def AES_encrypt(text, key, iv):
    pad = 16 - len(text) % 16
    text = text.encode("utf-8") + pad * chr(pad).encode("utf-8")
    cipher = AES.new(key.encode('utf8'), AES.MODE_CBC, iv)
    encryptedbytes = cipher.encrypt(text)
    encodestrs = base64.b64encode(encryptedbytes)
    enctext = encodestrs.decode('utf8')
    return enctext


def get_json(url, params, encSecKey):
    data = {
         "params": params,
         "encSecKey": encSecKey
    }
    hd = {
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0"
    }
    response = requests.post(url, headers=hd, data=data).content
    return response

if __name__ == "__main__":
    url = "https://music.163.com/weapi/v1/resource/comments/A_PL_0_2250011882?csrf_token="
    for i in range(1, 20):
        params = get_params(i);
        encSecKey = get_encSecKey();
        json_text = get_json(url, params, encSecKey)
        json_dict = json.loads(json_text)
        for item in json_dict['comments']:
            print(item['content'])