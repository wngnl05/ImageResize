### Amazon 쇼핑몰을 보다가 같은 이미지를 다른 사이즈로 변환하여 사용하는것을 보고
### url의 주소를 확인해 보니 같은 url이지만 뒤에 숫자(100, 300)에 따라 이미지 크기가 변환하는 것을 확인하였습니다.
### [https://m.media-amazon.com/images/I/51ochqf4d7L._AC_US100_.jpg](https://m.media-amazon.com/images/I/51ochqf4d7L._AC_US100_.jpg)
### [https://m.media-amazon.com/images/I/51ochqf4d7L._AC_US300_.jpg](https://m.media-amazon.com/images/I/51ochqf4d7L._AC_US300_.jpg)

<br>

# Architecture
![image](https://github.com/user-attachments/assets/5c105f33-c8c3-4071-9db7-afe3d7fd893f)

<br>

# CloudFront
### CloudFront에서 S3에 접근할 수 있도록 "퍼블릭 엑세스"를 허용해줍니다.
![image](https://github.com/user-attachments/assets/2345f6c6-9469-4c8e-aa71-9b6a3da17de0)
### Origin을 S3로 설정한 CloudFront를 만들어줍니다. 쿼리 문자열을 받기 위한 설정도 해줍니다.
![image](https://github.com/user-attachments/assets/bdb73705-e78e-4397-9d5e-43358d98f736)

<br>

# Lambda
### 람다를 구성할떄는 region을 "버지니아 복부"에서 nodejs 18.x를 사용하고 "제한 시간", "메모리"를 설정해줍니다.
![image](https://github.com/user-attachments/assets/38977ac4-04d9-4366-b34a-480cc4b68959)
### local에서 index.js, package.json, node_modules 를 zip으로 압축하여 람다에 업로드 해줍니다.
```
npm init -y
npm i aws-sdk jimp qs
```
### Lambda에서 "작업" - "Lambda@Edge 배포" 에서 적절히 설정하고
![image](https://github.com/user-attachments/assets/586bf22c-d7f9-4f53-8bdf-569042d15bab)

<br>

### 원본 이미지
![image](https://github.com/user-attachments/assets/e22e5273-a563-41a9-ac9b-996e84f05d65)
### 결과 300x300
![image](https://github.com/user-attachments/assets/e4c3f879-e437-4583-9edc-3fa64e16a490)
