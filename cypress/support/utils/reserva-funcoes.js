import { faker } from '@faker-js/faker';

export function gerarReservaAleatoria() {
  // Gera uma data de check-in futura
  const checkinDate = faker.date.soon({ days: 10 });
  // Gera uma data de checkout após o check-in, entre 1 e 10 dias depois
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + faker.number.int({ min: 1, max: 10 }));

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: checkinDate.toISOString().split('T')[0],
      checkout: checkoutDate.toISOString().split('T')[0],
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'None', 'Late Checkout'])
  };
}
