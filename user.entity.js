const {User} = require('./db/models/User.js');
const { Attachment } = require('./db/models/attachment.js');
const { Encrypt } = require('./db/models/encrypt.js');
const { File } = require('./db/models/file.js');
const { PersonalMessage } = require('./db/models/personal_message.js');
const { UserMessage } = require('./db/models/user_message.js');

async function findUserByPhone(phone) {
  try {
    const user = await User.findOne({
      where: { phone },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw error
  }
}

async function addMessageToPersonalChat(
  contactId,
  forwardMessage,
  answerMessageId,
  attachments,
  text,
  user_id
) {
  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw { code: 403, message: 'Пользователь не был найден' };
    }

    const encryptKey = await Encrypt.findOne({
      where: { user_id: user_id },
      attributes: ['key'],
    });

    let answerMessage = null;

    const findUser = await User.findByPk(user_id, {
      attributes: ['id', 'phone'],
    });

    const userMessage = await UserMessage.create({
      user_id: user_id,
      text,
      forwardMessage,
      answerMessage: answerMessageId,
      // shared_secret: encryptKey.key,
      shared_secret: "encryptKey.key",
    });

    let attachmentsData;

    if (attachments !== null && attachments.length !== 0) {
      for (const { id } of attachments) {
        const file = await File.findOne({
          where: { id },
        });

        await Attachment.create({
          message_id: userMessage.id,
          user_id: user_id,
          file_id: id,
          originalFilePath: file.originalFilePath,
          encupsFile: file.encupsFile,
        });
      }

      attachmentsData = await File.findAll({
        where: { id: attachments.map(attach => attach.id) },
        attributes: ['id', 'type', 'name', 'originalFilePath', 'encupsFile'],
      });
    }

    await PersonalMessage.create({
      message_id: userMessage.id,
      user_id: user_id,
      contact_id: contactId,
    });
    return {
      users: [{ id: contactId }, { id: user.id }],
      data: {
        user_id: user_id,
        chat_id: contactId,
        is_personal: true,
        message: {
          message_id: userMessage.id,
          text: userMessage.text,
          time: userMessage.send,
          forwardMessage: userMessage.forwardMessage,
          answerMessage,
          phone: findUser.dataValues.phone,

          attachments: attachmentsData
            ? attachmentsData
                .map(a => {
                  return {
                    file_id: a.id,
                    type: findFileType(a.type),
                    name: a.name,
                    originalFilePath: a.originalFilePath,
                    encupsFile: a.encupsFile,
                  };
                })
                .reverse()
            : null,
        },
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  } catch (error) {
    logger.error(error);
    console.log(error);
    throw { status: 500, message: 'Ошибка поиска контактов' };
  }
}
module.exports = { findUserByPhone, createUser, addMessageToPersonalChat};