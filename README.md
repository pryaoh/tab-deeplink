# MS Teams Call DeepLink 
simple  MS Teams App Deeplink craeted by generator-teams - Yo Teams


## 실행


### 사전 준비 사항

#### ngrok
 외부에서 내부 서버(localhost) 접속가능하게 해주는 프로그램  클라우드 서비스 테스트할때 많이 사용
[여기서](https://ngrok.com) 다운로드 받아서 설치 

ngrok를 이용하여 웹(html)을 보여줄려면 **AuthToken**이 필요한다. ngrok 로그인 (계정생성 필요) 하여 [상태 페이지](https://dashboard.ngrok.com/get-started/your-authtoken)를 보면 아래와 같이 표시된다.

=화면1=

AuthToken 등록
```shell
ngrok authtoken {{TokenValue}}
```

ngrok 실행
```
ngrok http 8080
```
=화면2=

'''
https://149372cc1eda.ngrok.io
'''

#### 소스받기 

``` bash
git clone https://github.com/pryaoh/tab-deeplink.git
cd tab-deeplink
npm install
``` 

#### 



manifest\manifest.json


## 참고
- [Create deep links](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links)
- [Yo Teams - the Microsoft Teams app generator](https://pnp.github.io/generator-teams/)



