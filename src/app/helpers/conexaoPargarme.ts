import pagarme from 'pagarme';

export default async function() {
  try {
    const client = await pagarme.client.connect({
      api_key: process.env.API_KEY
    });

    return {
      status: true,
      data: client
    };
  } catch (err) {
    return {
      status: false,
      data: err
    };
  }
}
