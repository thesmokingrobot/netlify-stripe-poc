const content = {
  free: {
    src:
      'https://robotwealth.com/wp-content/uploads/2018/10/Screenshot-2019-11-08-at-12.25.01-904x600.png',
    alt: 'Risk Premia Bootcamp',
    credit: 'Quant  HQ',
    creditLink: 'https://robotwealth.com',
    message: 'To view this content, you need to create an account!',
    allowedRoles: ['free', 'pro', 'premium'],
  },
  pro: {
    src:
      'https://robotwealth.com/wp-content/uploads/2020/01/Screenshot-2020-01-22-at-11.57.00-920x600.png',
    alt: 'Robots',
    credit: 'Quant HQ',
    creditLink: 'https://robotwealth.com',
    message:
      'This is only available on pro plan or higher.',
    allowedRoles: ['pro', 'premium'],
  },
  premium: {
    src:
      'https://robotwealth.com/wp-content/uploads/2020/03/Screenshot-2020-03-18-at-15.02.41-918x600.png',
    alt: 'Armageddon',
    credit: 'Quant HQ',
    creditLink: 'https://robotwealth.com',
    message:
      'This is only available on the premium plan.',
    allowedRoles: ['premium'],
  },
};

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body);
  const { user } = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const { allowedRoles } = content[type];

  if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        src:
          'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1592618179/stripe-subscription/subscription-required.jpg',
        alt: 'corgi in a crossed circle with the text “subscription required”',
        credit: 'Quant HQ',
        creditLink: 'https://dribbble.com/jlengstorf',
        message: `This content requires a ${type} subscription.`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(content[type]),
  };
};
