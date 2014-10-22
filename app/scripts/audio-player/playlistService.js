'use strict';

angular.module('cfFront')
    .factory('playlistService', function(apiService) {
        var playlist = {
            nowPlaying : '',
            currentTrack: 0,
            track: function(track){
                if (track){
                    return track;
                } else {
                    return {track_title: 'Fidelio - Disc 2 Track 1', id: 'TR0000000005', track_path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++01.MP3'};
                }
            },
            audioPlaylist : [{
                src: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++01.MP3',
                type: 'audio/mp3'
            }],

            addTrack: function(track){

                this.audioPlaylist.push({
                    track: track,
                    src: 'http://10.0.10.10' + track.track_path,
                    type: 'audio/mp3'
                });
            },

            //If 'play' is true, then clear playlist and start playing first track. If it's false, just add to end of existing playlist.
            addTracks : function(tracks){
                for(var i = 0; i < tracks.length; i++){
                        this.addTrack(tracks[i].track);
                }
            }

            //fetchAndAddTracks: function(data, action, dataType){
            //    apiService.root.rootPath = 'http://10.0.10.10/' + dataType + '/';
            //
            //    apiService.getTracks(data.id)
            //        .success(function(data, status) {
            //            if(action === 'add'){
            //                this.addTracks(data.data);
            //            } else {
            //                this.playMany(data.data);
            //            }
            //
            //        });
            //}
        };

        return playlist;
    });