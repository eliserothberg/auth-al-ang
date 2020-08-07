import { Component, OnInit } from '@angular/core';
import {AlfrescoApiService, ObjectDataRow, ObjectDataTableAdapter} from '@alfresco/adf-core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  data = new ObjectDataTableAdapter(
      [
        {
          id: 1,
            firstName: 'Name #1',
            lastName: 'Lastname #1',
            createdBy: 'User #1',
          status: 'green',
          icon: 'material-icons://folder_open'
        },
        {
          id: 2,
            firstName: 'Name #2',
            lastName: 'Lastname #2',
          createdBy: 'User #2',
          status: 'red',
          icon: 'material-icons://accessibility'
        },
        {
          id: 3,
            firstName: 'Name #3',
            lastName: 'Lastname #3',
          createdBy: 'User #3',
          status: 'green',
          icon: 'material-icons://alarm'
        }
      ]
  );

  constructor(
      private apiService: AlfrescoApiService,
      private http: HttpClient,

  ) { }

  ngOnInit(): void {
      const result = this.pullAPI();
      console.log('************ result in on init');
      console.log(result);
      // this.apiService.getInstance().webScript.executeWebScript(
      //     'GET',
      //     'people',
      //     [],
      //     null,
      //     'api/-default-/public/alfresco/versions/1',
      //     null,
      //     // Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM='
      // ).then(
      //     (response: any) => {
      //         const results = [];
      //         console.log(results)
      //         for (const entry of response.list.entries) {
      //             results.push({
      //                 id: entry.entry.id,
      //                 firstName: entry.entry.firstName,
      //                 lastName: entry.entry.lastName,
      //                 status: 'green',
      //                 icon: 'material-icons://accessibility'
      //             });
      //         }
      //         this.data.setRows(results.map(item => { return new ObjectDataRow(item); }));
      //     }
      // );

  }
  onRowClick(event: any) {
    alert('We just clicked row id: ' + event.value.obj.id);
  }

  pullAPI() {
          const httpOptions = {
              headers: new HttpHeaders({
                  Authorization: 'Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=',
                  Accept: 'application/json',
              })
          };
      console.log('this.http.get(`/api/-default-/public/alfresco/versions/1/people`, httpOptions');
      console.log(this.http.get(`/api/-default-/public/alfresco/versions/1/people`, httpOptions));
          return this.http.get(`/api/-default-/public/alfresco/versions/1/people`, httpOptions);
  }

}
