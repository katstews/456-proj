# 456-project

## members 
Noah Larson, 
Derek Brown, 
Katie Tran,
Katherine Chen 

## contribution 
Katherine: IPSec tunnel, Katie: Kerberos Server/Client, 


## how to run code 
### Certificate Authority and Web Servers 
To create a certificate authority and certificates, we used the guide from https://help.ubuntu.com/community/OpenSSL almost word-for-word except for one of our certificates. In the guide, we start off by installing openssl and creating a set of directories in order to better organize our working environment. We created a directory called “CA” and two directories, “signedcerts” and “private” to store our certificates and keys in. We created an openssl config for our certificate authority based off the template provided

Then we created our certificate authority and key by setting our openssl_conf in environment variables and calling “openssl req -x509 -newkey rsa:2048 -out cacert.pem -outform PEM -days 1825.” We created a single server configuration file and then adjusted the organizational unit to each server name to distinguish between the certificates. 



### OpenVPN
To start off setting up an OpenVPN server, we needed to install the packages: openvpn, openssl, ca-certificates, as well as easyrsa from https://github.com/OpenVPN/easy-rsa/. Then we created a PKI using “easyrsa --batch init-pki,” created a certificate authority using “easyrsa --batch build-ca nopass,” and created our server certificate (easyrsa --batch --days=3650 build-server-full server nopass), client certificate (easyrsa --batch --days=3650 build-client-full client nopass), and a certificate revocation list (easyrsa --batch --days=3650 gen-crl). We then used the following set of commands to move the files and give them proper permissions: “cp pki/ca.crt pki/private/ca.key pki/issued/server.crt pki/private/server.key pki/crl.pem /etc/openvpn/server,” “chown nobody:"$group_name" /etc/openvpn/server/crl.pem,” and “chmod o+x /etc/openvpn/server/.” We then generate a TLS crypt key using “openvpn --genkey --secret /etc/openvpn/server/tc.key.” We copied a predefined deffiehellman group to /etc/openvpn/server/dh.pem. We used an service file to make sure openvpn was forward on the iptables and started created our server.conf, and the client ovpn file as depicted below. Notice the part in <ca> is our certificate authority certificate, <cert> is our client certificate, <key> is the client’s private key and tls-crypt is our tc.key 

### SSH Server

### IPSec Tunnel 
First thing to do is generate a key that both servers will use to secure the tunnel. Here I used openSSL to generate a random 64 bit key that is encoded with base64. 

This key was then shared between the two systems within their own ipsec.secrets file. In this case the ‘left’ server will be kashew and the ‘right’ server will be ubuntu2. The ip address of kashew is 192.168.64.19 and the ip address of ubuntu2 is 192.168.64.17. 

This file will encrypt the tunnel to be used by the two vm’s. Next step is to prep the ipsec.conf file so that we can make these two vm’s set an established tunnel. 

So each vm is going to be their own “left” and the “right” will be the other vm they are trying to connect to. It was important to put what key you want to use in the secrets file, as we will be referencing back to it in the conf file, we can see that as “authby” is set to secret. The IKE, which stands for Internet Key Exchange, will negotiate the encryption process it will use to encrypt the messages being sent. ESP will handle how the entire packet will be encrypted and how the new header of the packet will be how the packet is encrypted. 

Now you just need to restart the IPSec configuration and the tunnel will be established between the two vm’s. Below shows the established IPSec tunnel. 



### PGP Email 

### DNSSEC Server/Client

### Kerberos Server

