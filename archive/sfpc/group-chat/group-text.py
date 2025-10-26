 # Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client



account_sid = 'AC3928c1292cc5e54f83ae300a48e25b18'
auth_token = 'da6fba9db85e6aa9c2a570a0792fcc9f'
client = Client(account_sid, auth_token)


message = client.messages \
    .create(
         body="hii digital love languages ⚘☄︎✧!",
         from_='+19706846937',
         to='+16096785425'
     )