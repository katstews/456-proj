~~# 456-project~~
# 452 Project

## members 
Noah Larson, 
Derek Brown, 
Katie Tran,
Katherine Chen 

## contribution 
Katherine: IPSec tunnel <br> 
Katie: Kerberos Server/Client, SSH <br> 
Noah: DNSSEC <br> 
Derek: Web Certificate, PGP Email, OpenVPN <br>


## how to run code 
### Certificate Authority and Web Servers 
To create a certificate authority and certificates, we used the guide from https://help.ubuntu.com/community/OpenSSL almost word-for-word except for one of our certificates. In the guide, we start off by installing openssl and creating a set of directories in order to better organize our working environment. We created a directory called “CA” and two directories, “signedcerts” and “private” to store our certificates and keys in. We created an openssl config for our certificate authority based off the template provided

Then we created our certificate authority and key by setting our openssl_conf in environment variables and calling “openssl req -x509 -newkey rsa:2048 -out cacert.pem -outform PEM -days 1825.” We created a single server configuration file and then adjusted the organizational unit to each server name to distinguish between the certificates. 



### OpenVPN
To start off setting up an OpenVPN server, we needed to install the packages: openvpn, openssl, ca-certificates, as well as easyrsa from https://github.com/OpenVPN/easy-rsa/. Then we created a PKI using “easyrsa --batch init-pki,” created a certificate authority using “easyrsa --batch build-ca nopass,” and created our server certificate (easyrsa --batch --days=3650 build-server-full server nopass), client certificate (easyrsa --batch --days=3650 build-client-full client nopass), and a certificate revocation list (easyrsa --batch --days=3650 gen-crl). We then used the following set of commands to move the files and give them proper permissions: “cp pki/ca.crt pki/private/ca.key pki/issued/server.crt pki/private/server.key pki/crl.pem /etc/openvpn/server,” “chown nobody:"$group_name" /etc/openvpn/server/crl.pem,” and “chmod o+x /etc/openvpn/server/.” We then generate a TLS crypt key using “openvpn --genkey --secret /etc/openvpn/server/tc.key.” We copied a predefined deffiehellman group to /etc/openvpn/server/dh.pem. We used an service file to make sure openvpn was forward on the iptables and started created our server.conf, and the client ovpn file as depicted below. Notice the part in <ca> is our certificate authority certificate, <cert> is our client certificate, <key> is the client’s private key and tls-crypt is our tc.key 

### SSH Server
To create a SSH server, I started off by installing openssh-server through apt with the command “sudo apt install openssh-server.”  This package will help allow for secure remote access to my SSH server. I then start and enabled the ssh service via systemctl. I created an SSH key pair on our client machine using ssh-keygen and then copied this key using ssh-copy-id -i ./id_rsa server@192.168.111.157. 

Additionally, for added security, I chose to edit the ssh config on the server to limit authentication to publickey only by setting “PasswordAuthentication” to “No” in our SSH config files which can be found in /etc/ssh/sshd_config

Then I’ll restart the session and then on another machine  I will connect to my server using ssh, ssh -i [path-to-key] username@server_ip. If everything is configured properly, I should be able to log in to my server without being prompted for a password. I specified -i because I have my key file in a non default location for keys. Otherwise, you can do it without the “-i” flag and path to key, as it would look at the /.ssh directory for keys.

### IPSec Tunnel 
First thing to do is generate a key that both servers will use to secure the tunnel. Here I used openSSL to generate a random 64 bit key that is encoded with base64. 

This key was then shared between the two systems within their own ipsec.secrets file. In this case the ‘left’ server will be kashew and the ‘right’ server will be ubuntu2. The ip address of kashew is 192.168.64.19 and the ip address of ubuntu2 is 192.168.64.17. 

This file will encrypt the tunnel to be used by the two vm’s. Next step is to prep the ipsec.conf file so that we can make these two vm’s set an established tunnel. 

So each vm is going to be their own “left” and the “right” will be the other vm they are trying to connect to. It was important to put what key you want to use in the secrets file, as we will be referencing back to it in the conf file, we can see that as “authby” is set to secret. The IKE, which stands for Internet Key Exchange, will negotiate the encryption process it will use to encrypt the messages being sent. ESP will handle how the entire packet will be encrypted and how the new header of the packet will be how the packet is encrypted. 

Now you just need to restart the IPSec configuration and the tunnel will be established between the two vm’s. Below shows the established IPSec tunnel. 

### PGP Email 
To set up a PGP supporting email, we chose to use Thunderbird and Enigmail out of the interest of simplicity and the fact that it remains one of the more email-focused PGP setups. The system is extremely simple as you simply set what type of key and an expiration date and it generates the key for you. I chose to go with ECC as our key algorithm simply because of its increased performance and security over RSA and the fact that it was provided. Additionally, I chose to set the expiry date as 4 years from today. I then exported the key for backup or use in other software or devices

### DNSSEC Server/Client
This section of the project involves setting up a DNSSEC-based DNS Server to allow the secure transfer of DNS information. The Domain Name System translates human-readable domain names (example.com) into IP addresses that computers can read. DNS is vulnerable to many attacks, such as DNS cache poisoning and DNS spoofing, which can result in users being redirected to malicious websites and/or having their communications intercepted. DNSSEC (Domain Name System Security Extensions) is a set of cryptographic protocols and extensions that add an extra layer of security to DNS to help ensure the authenticity and integrity of DNS responses by digitally signing the DNS records.

First I installed the BIND(Berkeley Internet Name Domain) DNS server software, a widely used and trusted DNS server implementation, to provide the necessary functionality to support DNSSEC.
Next, I generated DNSSEC keys for signing and validating the DNS records. I generated a private keys “Kexample.com.+007+06975.private” and “Kexample.com.+007+26280.private” for signing and a corresponding public keys “Kexample.com.+007+06975.key” and Kexample.com.+007+26280.key” for verification.

Next, I configured BIND for DNSSEC by modifying the server’s configuration file “named.conf.options” by setting the “dnssec-enable” and “dnssec-validation” options to yes.

Next, I modified “named.conf.local” to integrate the DNSSEC keys generated earlier. 

Next, I restarted BIND using the command “sudo systemctl restart bind9” and verified that DNSSEC was functioning correctly using “dig”.

To demonstrate the function of my server using a DNSSEC client, I installed wireshark to capture network traffic and illustrate the function. I applied a “DNS” filter to only capture DNS traffic over the network and performed another dig command to get a response that wireshark could capture.

### Kerberos Server
This section of the project involves setting up a Kerberos Server and Client. The goal of setting up a Kerberos server and client is to establish a secure and trusted authentication infrastructure for a network. This allows users and machines in that network to have a centralized authentication service that can allow an organization to achieve several security benefits such as single sign-on, encryption, mutual authentication, and centralized administration.

In my implementation of setting up a Kerberos Server and Client, I made sure to have hostname resolution set up to have the Kerberos server and client machines be able to communicate with each other using hostnames instead of IP addresses. I set up hostname resolution by modifying the /etc/hosts file on both machines to include the IP address and the hostnames of both machines. This can be seen in my screenshot of that file in my Kerberos-server machine. The third line maps the hostname of my Kerberos server, debian.kerberos-server.edu to the IP 192.168.160.145 to ensure that the machine can resolve its hostname to its local network IP address. Meanwhile, the fourth line maps the hostname of the Kerberos client, debian.kerberos-client.edu, to IP 192.168.160.146. I also added these two lines to the /etc/hosts file of my Kerberos-client machine.

Then I installed the Kerberos server and Kerberos Key Distribution Center packages on the Debian machine I wanted to have as my server. After going through the initial set-up I check my configurations

Since I want to ensure administrative privileges will be granted to all principals ending with ‘/admin’, I edit /etc/krb5kdc/kadm5.acl by adding the line  ‘*/admin *.’ 
  
After making this configuration, I will add a principal named “kadmin”. Note: this is not an admin user. If I wanted to have the user added as an admin I would add them using “addprinc kadmin/admin” instead of “addprinc kadmin”

On the client machine, I installed Kerberos client and authenticated the user, and obtained a TGT, which serves as proof of the user’s identity and allows them to request service tickets for accessing services protected by Kerberos without requiring repeated password entry. I can view my ticket through the command klist.

Next, I want to verify the details of the kadmin user on the Kerberos server. This ensures that the principal was created successfully and has the intended configurations.

At this point, I have set up a simple Kerberos Server and a Simple Kerberos Client that logs onto the Kerberos server and verified that the user, kadmin was able to login from the client Kerberos successfully.  

