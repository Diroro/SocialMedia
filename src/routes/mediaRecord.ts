import { Application } from 'express';
import {
  addMediaRecord,
  getMediaRecords,
  deleteMediaRecord,
  editMediaRecord,
  likeMediaRecord,
  unlikeMediaRecord,
  getRecordLikes
} from '../controllers/mediaRecord';
import { authValidator } from '../controllers/auth';
import { API_CONST } from '../utils/appConsts';

export const register = (app: Application) => {
    // get media-records => all mediaRecords (add pagination)
    // get media-records by user

    // post media-records => add my media record

    // put media-records/id => change my media record
    // if media is not mine => can't put ( forbidden? or BAD request?)

    // delete media-records/id => delete MY media record
    // if media is not mine => can't put ( forbidden? or BAD request?)
    //
    // put media-records/:id/likes
    // delete media-records/:id/likes
    //
    app.get(`${API_CONST}/media-records`, authValidator, getMediaRecords);
    app.post(`${API_CONST}/media-records`, authValidator, addMediaRecord);
    app.put(`${API_CONST}/media-records/:id`, authValidator, editMediaRecord);
    app.delete(`${API_CONST}/media-records/:id`, authValidator, deleteMediaRecord);

    app.put(`${API_CONST}/media-records/:id/like`, authValidator, likeMediaRecord);
    app.delete(`${API_CONST}/media-records/:id/like`, authValidator, unlikeMediaRecord);
    app.get(`${API_CONST}/media-records/:id/likes`, authValidator, getRecordLikes);
};
