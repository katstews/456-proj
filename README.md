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

This key was then shared between the two systems within their own ipsec.secrets file. In this case the ‘left’ server will be kashew and the ‘right’ server will be ubuntu2. The ip address of kashew is 192.168.64.19 and the ip address of ubuntu2 is 192.168.64.17. 

This file will encrypt the tunnel to be used by the two vm’s. Next step is to prep the ipsec.conf file so that we can make these two vm’s set an established tunnel. 

So each vm is going to be their own “left” and the “right” will be the other vm they are trying to connect to. It was important to put what key you want to use in the secrets file, as we will be referencing back to it in the conf file, we can see that as “authby” is set to secret. The IKE, which stands for Internet Key Exchange, will negotiate the encryption process it will use to encrypt the messages being sent. ESP will handle how the entire packet will be encrypted and how the new header of the packet will be how the packet is encrypted. 

Now you just need to restart the IPSec configuration and the tunnel will be established between the two vm’s. Below shows the established IPSec tunnel. 

