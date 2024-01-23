import { User } from "./User";
import { Attachment } from "./attachment";
import { Contact } from "./contact";
import { Encrypt } from "./encrypt";
import { File } from "./file";
import { PersonalMessage } from "./personal_message";
import { UserMessage } from "./user_message";
import { UserReadMessageMtm } from "./user_read_message_mtm";

async function relationsStart() {
  User.belongsToMany(GroupChat, {
    through: UserGroupsMtm,
    foreignKey: 'user_id',
  });
  User.hasMany(Contact, { foreignKey: 'user_id', as: 'Contacts' });

  Encrypt.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
  User.hasOne(Encrypt, { foreignKey: 'user_id' });


  Attachment.belongsTo(UserMessage, {
    foreignKey: 'message_id',
    targetKey: 'id',
  });
  UserMessage.hasMany(Attachment, { foreignKey: 'message_id' });
  Attachment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
  Attachment.belongsTo(File, { foreignKey: 'file_id', targetKey: 'id' });
  UserMessage.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
  UserReadMessageMtm.belongsTo(UserMessage, {
    foreignKey: 'message_id',
    targetKey: 'id',
  });
  UserMessage.hasMany(UserReadMessageMtm, { foreignKey: 'message_id' });
  UserReadMessageMtm.belongsTo(User, {
    foreignKey: 'author_id',
    targetKey: 'id',
  });
  UserReadMessageMtm.belongsTo(User, {
    foreignKey: 'reader_id',
    targetKey: 'id',
  });

  PersonalMessage.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  PersonalMessage.belongsTo(User, { foreignKey: 'contact_id', as: 'contact' });
  PersonalMessage.belongsTo(UserMessage, {
    foreignKey: 'message_id',
    as: 'userMessage',
  });

  UserMessage.belongsTo(UserMessage, {
    foreignKey: 'forwardMessage',
    targetKey: 'id',
  });
  UserMessage.belongsTo(UserMessage, {
    foreignKey: 'answerMessage',
    targetKey: 'id',
  });
}
module.exports = { relationsStart };