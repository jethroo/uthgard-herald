import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuildProfile} from './guild.model';
//import {mockGuildProfiles} from './mock-guild-profiles';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GuildProfileService {

  constructor(private http: Http){}

  /**
   * Gets the GuildProfile of a character
   * @param name The guild's name to look up
   * @returns {Promise<GuildProfile>}
   */
  getGuildProfile(name: string): Observable<GuildProfile>{
    //todo hook into real API once it exists
    return this.getGuildProfileFromFile(name);
  }

  private getGuildProfileFromFile(name: string){
    let fileName = name.replace(/ /g, "-");
    console.log(`fileName: ${fileName}`);
    return this.http.get(`/data/guilds/${fileName}.json`)
                    .map((res) => {

                      if (res.status !== 200){
                        throw new Error('Guild not found');
                      }

                      let data = JSON.parse(res.text());
                      let foundGuild = data;

                      return new GuildProfile(
                        foundGuild.name,
                        foundGuild.contact,
                        foundGuild.website, 
                        foundGuild.guildHouse,
                        foundGuild.guildRealmPoints,
                        foundGuild.players,
                        foundGuild.realm,
                      );
                    });
  }
}
