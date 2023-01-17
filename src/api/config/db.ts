import { AppDataSource } from "./data-source";
import chalk from 'chalk';

const connect = async () => {
  try {
    const dataSource = await AppDataSource.initialize();

    console.log(`MySqlDB Connected: ${chalk.cyan.underline(dataSource.isInitialized)}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default { connect };
