const Sequelize = require('sequelize');
const sqlize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	operatorsAliases: false,
  
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	},
  
	// SQLite only
	storage: 'data/wf-info.sqlite'
});

const Frame = sqlize.define('Frame', {
	name: {
		type: Sequelize.STRING,
		unique: 'name'
	}
});

const User = sqlize.define('User', {
	username: {
		type: Sequelize.STRING,
		unique: 'username'
	},
	energy: {
		type: Sequelize.INTEGER,
		defaultValue: 100		
	}
});

User.hasOne(Frame);

function generateDatabase() {
	Frame.sync({ force: true }).then(() => {
		Frame.create({ name: 'Ash' });
		Frame.create({ name: 'Atlas' });
		Frame.create({ name: 'Banshee' });
		Frame.create({ name: 'Chroma' });
		Frame.create({ name: 'Ember' });
		Frame.create({ name: 'Equinox' });
		Frame.create({ name: 'Excalibur' });
		Frame.create({ name: 'Frost' });
		Frame.create({ name: 'Gara' });
		Frame.create({ name: 'Harrow' });
		Frame.create({ name: 'Hydroid' });
		Frame.create({ name: 'Inaros' });
		Frame.create({ name: 'Ivara' });
		Frame.create({ name: 'Khora' });
		Frame.create({ name: 'Limbo' });
		Frame.create({ name: 'Loki' });
		Frame.create({ name: 'Mag' });
		Frame.create({ name: 'Mesa' });
		Frame.create({ name: 'Mirage' });
		Frame.create({ name: 'Nekros' });
		Frame.create({ name: 'Nezha' });
		Frame.create({ name: 'Nidus' });
		Frame.create({ name: 'Nova' });
		Frame.create({ name: 'Nyx' });
		Frame.create({ name: 'Oberon' });
		Frame.create({ name: 'Octavia' });
		Frame.create({ name: 'Rhino' });
		Frame.create({ name: 'Saryn' });
		Frame.create({ name: 'Titania' });
		Frame.create({ name: 'Trinity' });
		Frame.create({ name: 'Valkyr' });
		Frame.create({ name: 'Vauban' });
		Frame.create({ name: 'Volt' });
		Frame.create({ name: 'Wukong' });
		Frame.create({ name: 'Zephyr' });
		});
	User.sync({ force: true });
}

sqlize.authenticate().then(() => {
	console.log('Connection established.');
	if (Frame.count() <= 0) {
		generateDatabase();
	}

}).catch(err => {
	console.error('Unable to connect.', err);
})

function addUser(username, frame) {
	Frame.findOne({
		where: {
			name: frame
		}
	}).then(res => {
		console.log(res);
		if (res != null) {
			User.create({
				username: username,
				frame: frame,
			});
		}
	});
}

function getAllFrames() {
	return Frame.findAll().then(frames => {
		console.log(frames[0].name);
		return frames[0].name;
	});
}

module.exports = {
	addUser: addUser,
	getAllFrames: getAllFrames
};