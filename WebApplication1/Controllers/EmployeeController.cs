using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using WebApplication1.Models;
using System.Configuration;
using System.Web;

namespace WebApplication1.Controllers
{
    public class EmployeeController : ApiController
    {
        //Get
        public HttpResponseMessage Get()
        {
            string query = @"select EmployeeID, EmployeeName, Department, 
                             convert(varchar(10),DateOfJoin,120) as DateOfJoin , PhotoFileName from dbo.Employee";
            DataTable table = new DataTable();

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))

            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);  
        }

        //Post
        public string Post(Employee emp)
        {
            try
            {
                string query = @" insert into dbo.Employee values 
                ('" + emp.EmployeeName + @"'
                ,'" + emp.Department + @"'
                ,'" + emp.DateOfJoin + @"'
                ,'" + emp.PhotoFileName + @"'
                ) 
                ";
                DataTable table = new DataTable();

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully!!!";
            }
            catch (Exception)
            {
                return "Failed to Add!!!";
            }
        }

        //Put
        public string Put(Employee emp)
        {
            try
            {
                string query = @" update dbo.Employee set 
                                EmployeeName = '" + emp.EmployeeName + @"' 
                                ,Department = '" + emp.Department + @"'
                                ,DateOfJoin = '" + emp.DateOfJoin + @"'
                                ,PhotoFileName = '" + emp.PhotoFileName + @"'
                                where EmployeeID = " + emp.EmployeeID + @"";
                DataTable table = new DataTable();

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully!!!";
            }
            catch (Exception)
            {
                return "Failed to Update!!!";
            }
        }

        //Delete
        public string Delete(int id)
        {
            try
            {
                string query = @" delete from dbo.Employee where EmployeeID = " + id + @"";
                DataTable table = new DataTable();

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully!!!";
            }
            catch (Exception)
            {
                return "Failed to Delete!!!";
            }
        }

        [Route("api/Employee/GetAllDepartmentNames")]
        [HttpGet]
        public HttpResponseMessage GetAllDepartmentNames()
        {
            string query = @" select DepartmentName from dbo.Department";
            DataTable table = new DataTable();

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))

            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route ("api/Employee/SaveFile")]
        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);

                postedFile.SaveAs(physicalPath);

                return filename;
            }
            catch(Exception)
            {
                return "anonymous.png";
            }
        }
    }
}
