# 456-project

## members 
Noah Larson, 
Derek Brown, 
Katie Tran,
Katherine Chen 

## contribution 
Katherine: IPSec tunnel, Katie: Kerberos Server/Client, 


## how to run code 

### IPSec Tunnel 
First thing to do is generate a key that both servers will use to secure the tunnel. Here I used openSSL to generate a random 64 bit key that is encoded with base64. 

![Screenshot 2023-05-14 at 3 06 52 PM (2)](https://github.com/katstews/456-proj/assets/112781868/92e247c4-8d61-49ff-b93d-10030cc73158)

This key was then shared between the two systems within their own ipsec.secrets file. In this case the ‘left’ server will be kashew and the ‘right’ server will be ubuntu2. The ip address of kashew is 192.168.64.19 and the ip address of ubuntu2 is 192.168.64.17. 

<img width="735" alt="Screenshot 2023-05-14 at 3 19 54 PM" src="https://github.com/katstews/456-proj/assets/112781868/8b55f591-85c0-48bb-857c-707bda58f0c8">
<img width="623" alt="Screenshot 2023-05-14 at 3 20 22 PM" src="https://github.com/katstews/456-proj/assets/112781868/c0bb791e-1888-4bcf-8570-453871c7f506">
