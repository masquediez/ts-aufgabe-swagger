// src/routes/stats/StatisticsController.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Request,
  SuccessResponse,
  Tags,
  Query,
} from '@tsoa/runtime';
import { Request as ExpressRequest } from 'express';
import { StatusCodes } from 'http-status-codes';
import DeviceInfo from '../../database/models/DeviceInfoModel';

export interface ISetDeviceInfoBody {
  userId: number;
  version: string | null;
  baseOs: 'ios' | 'android' | 'windows' | 'web';
}

export type ISetDeviceInfoResponse = boolean;

// Nuevas interfaces y tipos de respuesta
export interface IGetAllStatsQuery {
  userId: number;
}

export interface IUpdateStatBody {
  statId: number;
  newValue: number;
}

export interface ICreateNewStatBody {
  userId: number;
  type: string;
  value: number;
}

export interface IDeleteStatBody {
  statId: number;
}

@Route('v1/stats')
@Tags('Statistics')
class StatsController extends Controller {
  @Post('/deviceinfo')
  @SuccessResponse(StatusCodes.CONFLICT)
  public async setDeviceInfo(
    @Request() req: ExpressRequest,
    @Body() body: ISetDeviceInfoBody,
  ): Promise<ISetDeviceInfoResponse | Error> {
    const { userId, version, baseOs } = body;

    if (userId) {
      await DeviceInfo.destroy({
        where: { userId, baseOs },
      });
    }
    await DeviceInfo.create({
      userId,
      version,
      baseOs,
    });
    return true;
  }

  // Nuevas rutas
  @Get('/')
  public async getAllStats(@Query() userId: number): Promise<any> {
    return await DeviceInfo.findAll({ where: { userId } });
  }

  @Put('/')
  public async updateStat(
    @Request() req: ExpressRequest,
    @Body() body: IUpdateStatBody,
  ): Promise<any> {
    const { statId, newValue } = body;
    const stat = await DeviceInfo.findByPk(statId);
    if (stat) {
      stat.value = newValue;
      await stat.save();
      return stat;
    }
    return null;
  }

  @Post('/')
  public async createNewStat(
    @Request() req: ExpressRequest,
    @Body() body: ICreateNewStatBody,
  ): Promise<any> {
    const { userId, type, value } = body;
    const newStat = await DeviceInfo.create({ userId, type, value });
    return newStat;
  }

  @Delete('/')
  public async deleteStat(
    @Request() req: ExpressRequest,
    @Body() body: IDeleteStatBody,
  ): Promise<any> {
    const { statId } = body;
    const stat = await DeviceInfo.findByPk(statId);
    if (stat) {
      await stat.destroy();
      return stat;
    }
    return null;
  }
}

export default StatsController;
