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

Frame.hasMany(User, { foreignKey: { allowNull: false }});

function generateDatabase() {
	Frame.sync().then(() => {
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
	User.sync();
}

async function initialize() {
	try {
		await sqlize.authenticate();
		console.log('Connection established.');
	
		var frames = await Frame.count();
	}
	catch (err) {
		if (err.name == 'SequelizeConnectionError' || err.name == 'SequelizeDatabaseError') {
			await generateDatabase();
		}
		else {
			console.error('Unable to connect.', err);
		}
	}	
}

async function addUser(username, frameName) {
	try {
		var frame = await Frame.findOne({
			where: { name: frameName },
			attributes: [ 'id' ]
		});

		if (frame == null) {
			return `'${frameName}' is not a valid option, ${username}.`;
		}

		await User.create({
			username: username,
			FrameId: frame.id,
		});

		return `Welcome in the simulation, ${username}.`;
	}
	catch (err) {
		console.log(err);
		if (err.name == "SequelizeUniqueConstraintError") {
			return `You're already in the simulation, ${username}.`;
		}
		else
			return `Anomaly detected. Please contact anyone with a master degree in fixing the universe.`;
	}
}

async function getAllFrames() {
	try {
		var frames = await Frame.findAll({
			attributes: [ 'name' ]
		});

		var res = `Here are the warframes at your disposal:\n`;

		for (var i = 0; i < frames.length; i++) {
			res += frames[i].name + '\n'
		}

		return res;
	}
	catch (err) {
		return `Anomaly detected. Please contact anyone with a master degree in fixing the universe.`;
	}
}

initialize();

module.exports = {
	addUser: addUser,
	getAllFrames: getAllFrames
};