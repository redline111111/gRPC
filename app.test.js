const supertest = require("supertest");
const request = supertest("http://localhost:3001");

jest.setTimeout(60 * 1000);
const uuidv4_regular = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
function generateRandomPhoneNumber() {
  const prefix = "+7965";
  let randomNumber = "";

  for (let i = 0; i < 7; i++) {
    randomNumber += Math.floor(Math.random() * 10); // Генерация одной случайной цифры от 0 до 9
  }

  return prefix + randomNumber;
}

const usersCount = 1000;
let users = [];

describe("Нагрузочный тест 1", () => {
  test(`Должно быть зарегистрированно ${usersCount} пользователей`, async () => {
    const registrationPromises = [];

    for (let i = 0; i < usersCount; i++) {
      registrationPromises.push(
        request.post("/register").send({
          first_name: "sadasd",
          // phone: `+796599483${i}`,
          phone: generateRandomPhoneNumber(),
          second_name: "AAAA",
          last_name: "Vladimirovich",
          description: "asd",
          login: `Usersa${i}`,
          hash: "asdasdasd",
          cases: [
            { question: "Год рожденияыв", answer: "2002" },
            { question: "Первый питомец", answer: "кот" },
          ],
        })
      );
    }

    const responses = await Promise.all(registrationPromises);

    responses.forEach((response) => {
      expect(response.statusCode).toBe(200);
      users.push(response.body.message);
    });

    expect(users).toHaveLength(usersCount);
  });
  //   const contactPromises = [];

  //   for (let i = 0; i < users.length; i++) {
  //     if (i % 2 === 0 && i + 1 < users.length) {
  //       const sender = users[i];
  //       const receiver = users[i + 1];

  //       contactPromises.push(
  //         request
  //           .post("/api/chat/personal/create")
  //           .set("Authorization", `Bearer ${sender.token}`)
  //           .send({ contactId: receiver.user.id })
  //       );
  //     }
  //   }

  //   const responses = await Promise.all(contactPromises);

  //   responses.forEach((response) => {
  //     expect(response.statusCode).toBe(200);
  //   });
  // });
});

//   test(`Группа создана`, async () => {
//     const response = await request.post("/api/group/create")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       groupName: "SomeChat",
//       usersPhones: [users[1].user.phone, users[2].user.phone]
//     })

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('message');
//     expect(response.body.message).toHaveProperty('groupId');
//     expect(response.body.message.groupId).toMatch(uuidv4_regular);

//     groupIds.push(response.body.message.groupId);
//   });

//   test(`Группа получена`, async () => {
//     const response = await request.post("/api/group/users")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       groupId: groupIds[0]
//     })
//     expect(response.statusCode).toBe(200);
//   });

//   test(`Пользователь добавлен в существующую группу`, async () => {
//     const response = await request.post("/api/group/users/add")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       groupId: groupIds[0],
//       usersPhones: [users[3].user.phone, users[4].user.phone]
//     })
//     expect(response.statusCode).toBe(200);
//   });

//   test(`Пользователи удалены из группы`, async () => {
//     const response = await request.post("/api/chat/group/users/delete")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       groupId: groupIds[0],
//       usersPhones: [users[3].user.phone, users[4].user.phone]
//     })
//     expect(response.statusCode).toBe(200);
//   });

//   test(`Получена информация о группе`, async () => {
//     const response = await request.put("/api/chat/group/info")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       groupId: groupIds[0]
//     })
//     expect(response.statusCode).toBe(200);
//   });

//   test(`Изменена информация о группе`, async () => {
//     const response = await request.put("/api/chat/group/info")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       groupId: groupIds[0],
//       groupDescription: 'ASDASD',
//       groupName: 'Pank'
//     })
//     expect(response.statusCode).toBe(200);
//   });

//   test(`Добавление в персональный чат`, async () => {
//     const response = await request.put("/api/personal/create")
//     .set("Authorization", `Bearer ${users[0].token}`)
//     .send({
//       contactId: users[3].user.id
//     })
//     expect(response.statusCode).toBe(200);
//   });
// })

// describe('Тесты валидации CHAT API', () => {

//   test('Проверка отсутствия заголовка Authorization', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .send({ groupName: "SomeChat", usersPhones: [users[1].phone] });

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Отсутствует заголовок Authorization или он пуст' 
//     }));
//   });

//   test('Проверка неправильного формата JWT токена', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .set('Authorization', 'InvalidToken')
//       .send({ groupName: "SomeChat", usersPhones: [users[1].phone]});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Неверный формат JWT токена' 
//     }));
//   });

//   test('Отсутствие имени', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .set('Authorization', users[1].token)
//       .send({ groupName: "", usersPhones: [users[1].user.phone]});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Имя группы обязательно для заполнения' 
//     }));
//   });

//   test('Имя группы больше 128 символов', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .set('Authorization', users[1].token)
//       .send({ groupName: 'a'.repeat(129), usersPhones: [users[1].user.phone]});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Длина имени группы не должна превышать 128 символов' 
//     }));
//   });

//   test('Пустые номера при создании группы', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .set('Authorization', users[1].token)
//       .send({ groupName: 'Chat', usersPhones: []});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Некорректный формат номера телефона' 
//     }));
//   });

//   test('Слишком длинный номер', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .set('Authorization', users[1].token)
//       .send({ groupName: 'Chat', usersPhones: ['1'.repeat(20)]});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Неверная длина номера телефона' 
//     }));
//   });

//   test('Буквы в номере телефона', async () => {
//     const response = await supertest(app)
//       .post('/api/group/create')
//       .set('Authorization', users[1].token)
//       .send({ groupName: 'Chat', usersPhones: ['a'.repeat(11)]});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Номер телефона должен содержать только цифры' 
//     }));
//   });

//   test('Буквы в номере телефона', async () => {
//     const response = await supertest(app)
//       .post('/api/group/users')
//       .set('Authorization', users[1].token)
//       .send({ groupId: 'Chat', usersPhones: ['a'.repeat(11)]});

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message.errors).toContainEqual(expect.objectContaining({ 
//       message: 'Номер телефона должен содержать только цифры' 
//     }));
//   });
//   // По аналогии добавьте тесты для других проверок валидации...
// });