import ElasticEmail from "@elasticemail/elasticemail-client";

const defaultClient = ElasticEmail.ApiClient.instance;

const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

const { apikey } = defaultClient.authentications;

apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = (data) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: data.to.map((email) => new ElasticEmail.EmailRecipient(email)),
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: data.html,
        }),
      ],
      Subject: data.subject,
      From: ELASTICEMAIL_FROM,
    },
  });

  const callback = function (error, data, response) {
    if (error) {
      console.error(error.message);
  };

  api.emailsPost(email, callback);
};

export default sendEmail;