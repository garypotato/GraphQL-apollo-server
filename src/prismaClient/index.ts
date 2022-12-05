import { PrismaClient } from '@prisma/client';

export class ReservationsDataSource {
  private dbConnection;
  private token;
  private user;

  constructor(options: { token: string }) {
    this.dbConnection = this.initializeDBConnection();
    this.token = options.token;
  }

  async initializeDBConnection() {
    return new PrismaClient();
  }

  async getUser() {
    if (!this.user) {
      // store the user, lookup by token
      this.user = await this.dbConnection.User.findByToken(this.token);
    }
    return this.user;
  }

  async getReservation(reservationId) {
    const user = await this.getUser();
    if (user) {
      return await this.dbConnection.Reservation.findByPk(reservationId);
    } else {
      // handle invalid user
    }
  }

  //... more methods for finding and creating reservations
}
